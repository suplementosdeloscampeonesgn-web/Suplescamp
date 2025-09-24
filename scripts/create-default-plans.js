import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createDefaultPlans() {
  const plans = [
    {
      name: "Plan de Entrenamiento Personalizado",
      price: 899,
      description: "Rutinas diseñadas específicamente para tu nivel y objetivos",
      duration: "10 semanas",
      type: "training",
      features: [
        "Rutinas con pesos libres y máquinas",
        "Ejercicios de aislamiento y compuestos", 
        "Progresión semanal adaptativa",
        "Videos explicativos de técnica",
        "Seguimiento de progreso"
      ],
      isPopular: false
    },
    {
      name: "Plan de Alimentación Estratégico",
      price: 799,
      description: "Sistema nutricional completo para maximizar resultados",
      duration: "8 semanas",
      type: "nutrition",
      features: [
        "Menús semanales personalizados",
        "Lista de compras detallada",
        "Recetas fáciles y deliciosas",
        "Guía de hidratación",
        "Ajustes semanales"
      ],
      isPopular: false
    },
    {
      name: "Plan de Suplementación Inteligente",
      price: 699,
      description: "Protocolo científicamente respaldado",
      duration: "12 semanas",
      type: "supplements",
      features: [
        "Selección de suplementos premium",
        "Dosificación personalizada",
        "Timing de consumo optimizado",
        "Stack de suplementos profesional",
        "Análisis de necesidades"
      ],
      isPopular: false
    },
    {
      name: "Plan Completo de Transformación",
      price: 1999,
      description: "El programa más completo para resultados totales",
      duration: "12 semanas",
      type: "complete",
      features: [
        "Todo lo anterior combinado",
        "Revisión semanal personalizada",
        "Soporte 24/7 vía WhatsApp",
        "Acceso a comunidad VIP",
        "Certificado al completar",
        "Garantía de resultados"
      ],
      isPopular: true
    }
  ];

  for (const planData of plans) {
    await prisma.plan.create({
      data: {
        ...planData,
        features: JSON.stringify(planData.features)
      }
    });
  }

  console.log("Planes creados exitosamente");
}

createDefaultPlans().catch(console.error).finally(() => prisma.$disconnect());
