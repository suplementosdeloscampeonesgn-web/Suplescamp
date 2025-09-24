import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function initProduction() {
  try {
    console.log("🚀 Inicializando base de datos de producción...");

    // Verificar si ya existe data
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      console.log("✅ Base de datos ya inicializada");
      return;
    }

    // Crear usuario admin
    const hashedPasswordAdmin = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 12);
    const admin = await prisma.user.create({
      data: {
        name: "Administrador",
        email: "suplementosdeloscampeonesgn@gmail.com",
        password: hashedPasswordAdmin,
        role: "admin"
      }
    });
    console.log("✅ Admin creado");

    // Crear planes
    const plans = [
      {
        name: "Plan de Entrenamiento Personalizado",
        price: 899,
        description: "Rutinas diseñadas específicamente para tu nivel y objetivos",
        duration: "10 semanas",
        type: "training",
        features: JSON.stringify([
          "Rutinas con pesos libres y máquinas",
          "Ejercicios de aislamiento y compuestos", 
          "Progresión semanal adaptativa",
          "Videos explicativos de técnica",
          "Seguimiento de progreso"
        ]),
        isPopular: false
      },
      {
        name: "Plan de Alimentación Estratégico",
        price: 799,
        description: "Sistema nutricional completo para maximizar resultados",
        duration: "8 semanas",
        type: "nutrition",
        features: JSON.stringify([
          "Menús semanales personalizados",
          "Lista de compras detallada",
          "Recetas fáciles y deliciosas",
          "Guía de hidratación",
          "Ajustes semanales"
        ]),
        isPopular: false
      },
      {
        name: "Plan de Suplementación Inteligente",
        price: 699,
        description: "Protocolo científicamente respaldado",
        duration: "12 semanas",
        type: "supplements",
        features: JSON.stringify([
          "Selección de suplementos premium",
          "Dosificación personalizada",
          "Timing de consumo optimizado",
          "Stack de suplementos profesional",
          "Análisis de necesidades"
        ]),
        isPopular: false
      },
      {
        name: "Plan Completo de Transformación",
        price: 1999,
        description: "El programa más completo para resultados totales",
        duration: "12 semanas",
        type: "complete",
        features: JSON.stringify([
          "Todo lo anterior combinado",
          "Revisión semanal personalizada",
          "Soporte 24/7 vía WhatsApp",
          "Acceso a comunidad VIP",
          "Certificado al completar",
          "Garantía de resultados"
        ]),
        isPopular: true
      }
    ];

    for (const planData of plans) {
      await prisma.plan.create({ data: planData });
    }

    console.log("🎉 ¡Base de datos inicializada correctamente!");

  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Solo ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  initProduction();
}

export default initProduction;
