"use client";

import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

const planes = [
  {
    id: 'transformation-12weeks',
    name: 'Plan de Transformación de 12 Semanas',
    description: 'Nuestro programa más completo para una transformación física total',
    price: 1999,
    originalPrice: 2999,
    duration: '12 semanas',
    popular: true,
    features: [
      'Plan de Entrenamiento Personalizado',
      'Plan de Alimentación Estratégico',
      'Plan de Suplementación Inteligente',
      'Revisión Semanal y Ajustes',
      'Soporte 24/7 vía WhatsApp',
      'Acceso a la App Exclusiva',
      'Comunidad VIP',
      'Certificado al Completar'
    ],
    benefits: [
      'Pérdida de grasa corporal',
      'Aumento de masa muscular',
      'Mejora en resistencia',
      'Optimización hormonal',
      'Mejor calidad de sueño',
      'Mayor energía diaria'
    ]
  },
  {
    id: 'nutrition-only',
    name: 'Plan Nutricional Personalizado',
    description: 'Enfócate solo en la alimentación para alcanzar tus objetivos',
    price: 799,
    originalPrice: 1299,
    duration: '8 semanas',
    popular: false,
    features: [
      'Plan de Alimentación Detallado',
      'Recetas y Menús Semanales',
      'Lista de compras',
      'Seguimiento Nutricional',
      'Ajustes Semanales',
      'Soporte por WhatsApp'
    ],
    benefits: [
      'Pérdida de peso saludable',
      'Mejor digestión',
      'Mayor energía',
      'Hábitos alimentarios duraderos'
    ]
  },
  {
    id: 'workout-only',
    name: 'Plan de Entrenamiento',
    description: 'Rutinas de ejercicio diseñadas para maximizar tus resultados',
    price: 899,
    originalPrice: 1499,
    duration: '10 semanas',
    popular: false,
    features: [
      'Rutinas de Entrenamiento',
      'Videos Explicativos',
      'Progresión Semanal',
      'Adaptación a tu Nivel',
      'Seguimiento de Progreso',
      'Soporte Técnico'
    ],
    benefits: [
      'Aumento de fuerza',
      'Ganancia muscular',
      'Mejor resistencia',
      'Técnica correcta'
    ]
  }
];

export default function Planes() {
  const router = useRouter();

  const handleSelectPlan = (planId) => {
    router.push(`/planes/${planId}`);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🏆 Elige Tu Plan de Transformación
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Selecciona el programa que mejor se adapte a tus objetivos y estilo de vida
          </p>
          <div className="flex justify-center items-center space-x-4 text-green-400">
            <span className="flex items-center">✅ Resultados Garantizados</span>
            <span className="flex items-center">✅ Soporte 24/7</span>
            <span className="flex items-center">✅ Sin Permanencia</span>
          </div>
        </div>
      </section>

      {/* Planes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {planes.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.popular ? 'border-green-500 scale-105' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-gray-500 text-lg line-through mb-2">
                      ${plan.originalPrice.toLocaleString()} MXN
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${plan.price.toLocaleString()}
                      <span className="text-lg text-gray-500 ml-1">MXN</span>
                    </div>
                    <div className="text-green-600 font-semibold">
                      🔥 {calculateDiscount(plan.originalPrice, plan.price)}% de descuento
                    </div>
                    <div className="text-gray-500 mt-2">
                      📅 {plan.duration}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    ✨ Incluye:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-3">✅</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    🎯 Beneficios:
                  </h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-blue-500 mr-3">🔸</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  🚀 Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            🛡️ Garantía de Satisfacción Total
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Si no estás completamente satisfecho con tu transformación en los primeros 30 días, 
            te devolvemos el 100% de tu dinero. Sin preguntas.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">💯</div>
              <h3 className="font-bold mb-2">Garantía 30 días</h3>
              <p className="text-sm">Devolución completa si no estás satisfecho</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold mb-2">Resultados Comprobados</h3>
              <p className="text-sm">Miles de clientes transformados exitosamente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Soporte Total</h3>
              <p className="text-sm">Acompañamiento personalizado durante todo tu proceso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">💪 Suplementos De Los Campeones GN</h3>
            <p className="text-gray-400">Tu aliado en la transformación física</p>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">
              &copy; 2024 Suplementos De Los Campeones GN. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
