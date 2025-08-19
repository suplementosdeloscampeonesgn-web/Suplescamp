"use client";

import Header from '../../components/Header';
import { useRouter } from 'next/navigation';

const servicios = [
  {
    id: 1,
    titulo: "🏋️‍♂️ Plan de Entrenamiento Personalizado",
    descripcion: "Rutinas diseñadas específicamente para tu nivel y objetivos",
    precio: 899,
    duracion: "10 semanas",
    incluye: [
      "✅ Rutinas con pesos libres y máquinas",
      "✅ Ejercicios de aislamiento y compuestos", 
      "✅ Progresión semanal adaptativa",
      "✅ Videos explicativos de técnica",
      "✅ Seguimiento de progreso"
    ],
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    titulo: "🥗 Plan de Alimentación Estratégico",
    descripcion: "Sistema nutricional completo para maximizar resultados",
    precio: 799,
    duracion: "8 semanas",
    incluye: [
      "✅ Menús semanales personalizados",
      "✅ Lista de compras detallada",
      "✅ Recetas fáciles y deliciosas",
      "✅ Guía de hidratación",
      "✅ Ajustes semanales"
    ],
    color: "from-green-500 to-green-700"
  },
  {
    id: 3,
    titulo: "💊 Plan de Suplementación Inteligente",
    descripcion: "Protocolo científicamente respaldado",
    precio: 699,
    duracion: "12 semanas",
    incluye: [
      "✅ Selección de suplementos premium",
      "✅ Dosificación personalizada",
      "✅ Timing de consumo optimizado",
      "✅ Stack de suplementos profesional",
      "✅ Análisis de necesidades"
    ],
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    titulo: "🏆 Plan Completo de Transformación",
    descripcion: "El programa más completo para resultados totales",
    precio: 1999,
    originalPrice: 2999,
    duracion: "12 semanas",
    popular: true,
    incluye: [
      "✅ Todo lo anterior combinado",
      "✅ Revisión semanal personalizada",
      "✅ Soporte 24/7 vía WhatsApp",
      "✅ Acceso a comunidad VIP",
      "✅ Certificado al completar",
      "✅ Garantía de resultados"
    ],
    color: "from-green-500 to-blue-600"
  }
];

export default function Servicios() {
  const router = useRouter();

  const handleSelectService = (servicioId) => {
    // Redirigir a página de detalles del servicio o checkout
    router.push(`/servicios/${servicioId}`);
  };

  const handleContacto = () => {
    window.open('https://wa.me/524443166595?text=¡Hola! Quiero información sobre sus servicios 💪', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🎯 Nuestros Servicios
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Programas diseñados por expertos para garantizar tu éxito
          </p>
          <div className="flex justify-center items-center space-x-6 text-green-400">
            <span className="flex items-center">✅ Resultados Garantizados</span>
            <span className="flex items-center">✅ Soporte 24/7</span>
            <span className="flex items-center">✅ Planes Personalizados</span>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                  servicio.popular ? 'border-green-500 scale-105' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {servicio.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {servicio.descripcion}
                  </p>
                  
                  <div className="mb-6">
                    {servicio.originalPrice && (
                      <div className="text-gray-500 text-lg line-through mb-2">
                        ${servicio.originalPrice.toLocaleString()} MXN
                      </div>
                    )}
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${servicio.precio.toLocaleString()}
                      <span className="text-lg text-gray-500 ml-1">MXN</span>
                    </div>
                    <div className="text-gray-500">
                      📅 {servicio.duracion}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    ✨ Incluye:
                  </h4>
                  <ul className="space-y-3">
                    {servicio.incluye.map((item, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectService(servicio.id)}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                    servicio.popular
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            💬 ¿Necesitas Ayuda para Elegir?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos te ayudarán a encontrar el plan perfecto para tus objetivos
          </p>
          <button
            onClick={handleContacto}
            className="bg-white text-green-600 text-xl font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
          >
            📞 Contactar Asesor
          </button>
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
