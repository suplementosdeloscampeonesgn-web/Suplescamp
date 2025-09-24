import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// GET - Obtener todos los usuarios
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const role = searchParams.get('role');

    // Construir filtros dinámicos
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (role && role !== 'all') {
      where.role = role;
    }

    if (status === 'with-plan') {
      where.planId = { not: null };
    } else if (status === 'without-plan') {
      where.planId = null;
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            status: true
          }
        },
        asesorias: {
          select: {
            id: true,
            title: true,
            tipo: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: [
        { role: 'desc' }, // Admins primero
        { id: 'desc' }    // Más recientes primero
      ]
    });

    // Agregar estadísticas adicionales
    const totalUsers = await prisma.user.count();
    const usersWithPlan = await prisma.user.count({
      where: { planId: { not: null } }
    });
    const totalAsesorias = await prisma.asesoria.count();

    return NextResponse.json({ 
      users,
      stats: {
        total: totalUsers,
        withPlan: usersWithPlan,
        withoutPlan: totalUsers - usersWithPlan,
        totalAsesorias
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { message: "Error al obtener usuarios", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo usuario (opcional, por si lo necesitas)
export async function POST(request) {
  try {
    const { name, email, password, phone, planId, role = 'user' } = await request.json();

    // Validaciones
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nombre, email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Ya existe un usuario con este email" },
        { status: 409 }
      );
    }

    // Verificar si el plan existe (si se proporciona)
    if (planId) {
      const planExists = await prisma.plan.findUnique({
        where: { id: planId }
      });
      
      if (!planExists) {
        return NextResponse.json(
          { message: "El plan especificado no existe" },
          { status: 400 }
        );
      }
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        planId: planId || null,
        role
      },
      include: {
        plan: true
      }
    });

    // No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Usuario creado exitosamente",
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { message: "Error al crear usuario", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Actualizar múltiples usuarios (por ejemplo, para actualizaciones masivas)
export async function PUT(request) {
  try {
    const { action, userIds, data } = await request.json();

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { message: "Acción y array de IDs de usuario son requeridos" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
case 'bulk-assign-plan':
  const { planId } = data;
  result = await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: { 
      planId,
      planAssignedAt: new Date() // ✅ Asignar fecha actual
    }
  });
  break;

      case 'bulk-change-role':
        const { role } = data;
        result = await prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { role }
        });
        break;

      case 'bulk-delete':
        // Primero eliminar asesorías relacionadas
        await prisma.asesoria.deleteMany({
          where: { userId: { in: userIds } }
        });
        
        // Luego eliminar usuarios
        result = await prisma.user.deleteMany({
          where: { id: { in: userIds } }
        });
        break;

      default:
        return NextResponse.json(
          { message: "Acción no válida" },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { 
        message: `Operación '${action}' completada exitosamente`,
        affected: result.count
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en operación masiva:", error);
    return NextResponse.json(
      { message: "Error en operación masiva", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar todos los usuarios (cuidado con esta función)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const confirm = searchParams.get('confirm');

    if (confirm !== 'yes-delete-all') {
      return NextResponse.json(
        { message: "Confirmación requerida para eliminar todos los usuarios" },
        { status: 400 }
      );
    }

    // Eliminar todas las asesorías primero
    await prisma.asesoria.deleteMany();
    
    // Eliminar todos los usuarios (excepto admins por seguridad)
    const result = await prisma.user.deleteMany({
      where: { role: { not: 'admin' } }
    });

    return NextResponse.json(
      { 
        message: "Usuarios eliminados exitosamente",
        deleted: result.count
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al eliminar usuarios:", error);
    return NextResponse.json(
      { message: "Error al eliminar usuarios", error: error.message },
      { status: 500 }
    );
  }
}
