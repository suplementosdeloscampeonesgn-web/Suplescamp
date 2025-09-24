import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Obtener sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Buscar el usuario logueado e incluir el plan asignado (objeto completo)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        plan: true // Trae el plan completo
      }
    });

    if (!user?.planId || !user?.plan) {
      return NextResponse.json({ plan: null, planAssignment: null });
    }

    // planAssignment: puedes personalizarlo según tu modelo, aquí lo básico
    const planAssignment = {
      assignedAt: user.planAssignedAt ?? user.updatedAt ?? user.createdAt
    };

    // Devuelve el plan y los datos de asignación
    return NextResponse.json({ plan: user.plan, planAssignment });
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return NextResponse.json({ error: 'Error al obtener plan del usuario' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}