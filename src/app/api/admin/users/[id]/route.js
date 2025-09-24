import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    console.log("Actualizando usuario:", id, data);
    
    // Verificar si se está cambiando el plan
    const currentUser = await prisma.user.findUnique({
      where: { id },
      select: { planId: true }
    });
    
    const planChanged = currentUser.planId !== data.planId;
    
    // Preparar datos para actualización
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      role: data.role,
      planId: data.planId || null
    };

    // ✅ Si cambió el plan, actualizar fecha de asignación
    if (planChanged && data.planId) {
      updateData.planAssignedAt = new Date();
    } else if (!data.planId) {
      // Si se quita el plan, también quitar la fecha
      updateData.planAssignedAt = null;
    }

    // Si se proporciona una nueva contraseña, hashearla
    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        plan: true,
        asesorias: true
      }
    });

    // No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    
    // Manejo específico de errores
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Ya existe un usuario con ese email" },
        { status: 409 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Error al actualizar usuario", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    console.log("Eliminando usuario:", id);
    
    // Primero eliminar las asesorías del usuario
    await prisma.asesoria.deleteMany({
      where: { userId: id }
    });
    
    // Luego eliminar el usuario
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Usuario eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Error al eliminar usuario", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        plan: true,
        asesorias: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json(
      { message: "Error al obtener usuario", error: error.message },
      { status: 500 }
    );
  }
}
