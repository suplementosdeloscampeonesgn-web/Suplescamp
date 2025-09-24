import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const plans = await prisma.plan.findMany({
      where: { status: 'activo' },
      orderBy: [
        { isPopular: 'desc' },
        { price: 'asc' }
      ]
    });

    const formattedPlans = plans.map(plan => ({
      ...plan,
      features: plan.features ? JSON.parse(plan.features) : []
    }));

    return NextResponse.json({ plans: formattedPlans }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error al obtener planes" }, { status: 500 });
  }
}
