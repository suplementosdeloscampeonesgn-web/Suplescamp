import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Obtener session del usuario (necesitarás esto cuando tengas NextAuth funcionando)
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    // }

    // Por ahora, usamos un método temporal para identificar al usuario
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const userEmail = searchParams.get('userEmail'); // Pasar email temporalmente
    
    if (!userEmail) {
      return NextResponse.json(
        { message: "Email de usuario requerido" },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        asesorias: {
          where: tipo ? { tipo } : {},
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

    return NextResponse.json(user.asesorias, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error al obtener asesorías" },
      { status: 500 }
    );
  }
}
