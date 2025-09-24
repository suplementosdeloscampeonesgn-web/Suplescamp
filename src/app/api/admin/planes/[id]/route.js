import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    console.log("Actualizando plan:", id, data);
    
    const plan = await prisma.plan.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description || '',
        duration: data.duration || '12 semanas',
        features: JSON.stringify(data.features || []),
        isPopular: data.isPopular || false,
        type: data.type || 'basic',
        status: data.status || 'activo'
      }
    });

    return NextResponse.json({ plan }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar plan:", error);
    return NextResponse.json(
      { message: "Error al actualizar plan", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Primero desasignar el plan de todos los usuarios
    await prisma.user.updateMany({
      where: { planId: id },
      data: { planId: null }
    });
    
    // Luego eliminar el plan
    await prisma.plan.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Plan eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar plan:", error);
    return NextResponse.json(
      { message: "Error al eliminar plan", error: error.message },
      { status: 500 }
    );
  }
}
