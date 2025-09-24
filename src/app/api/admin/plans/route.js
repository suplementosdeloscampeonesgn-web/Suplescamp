import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true,
      plans 
    });

  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ 
      success: true,
      plans: [] // Devolver array vacío si no hay tabla plans
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const plan = await prisma.plan.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        price: parseFloat(data.price),
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true,
      plan
    });

  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json({ 
      error: 'Error al crear plan' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
