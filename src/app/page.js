"use client";

import Header from '../components/Header';
// ✅ SIN NEXTAUTH - Eliminado como acordamos
// import { useSession, signIn, signOut } from 'next-auth/react';

// Plan de Transformación de 12 Semanas - Información completa
const planTransformacion = {
  titulo: "Plan de Transformación de 12 Semanas",
  subtitulo: "Suplementos de los Campeones GN",
  precio_original: 2999, // ✅ Corregido: sin escape
  precio_promocional: 1999, // ✅ Corregido: sin escape
  duracion: "12 semanas completas",
  ubicacion: "Av. Vicente Rivera 131-A, Nuevo Paseo SLP",
  telefono: "4443166595"
};

const serviciosIncluidos = [
  {
    id: 1,
    titulo: "🏋️‍♂️ Plan de Entrenamiento Personalizado",
    descripcion: "Rutinas diseñadas específicamente para tu nivel y objetivos, con progresión semanal garantizada.",
    detalles: [
      "✅ Rutinas con pesos libres y máquinas",
      "✅ Ejercicios de aislamiento y compuestos", 
      "✅ Progresión semanal adaptativa",
      "✅ Técnicas avanzadas de entrenamiento"
    ],
    icono: "🏋️‍♂️",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    titulo: "🥗 Plan de Alimentación Estratégico",
    descripcion: "Sistema nutricional completo para maximizar tus resultados y acelerar tu transformación.",
    detalles: [
      "✅ Desayuno, comidas, cena y snacks",
      "✅ Opciones de alimentos variadas",
      "✅ Guía completa de hidratación",
      "✅ Recetas fáciles y deliciosas"
    ],
    icono: "🥗",
    color: "from-green-500 to-green-700"
  },
  {
    id: 3,
    titulo: "💊 Plan de Suplementación Inteligente",
    descripcion: "Protocolo de suplementos científicamente respaldado para optimizar tu rendimiento.",
    detalles: [
      "✅ Suplementos de calidad premium",
      "✅ Frecuencia y timing exacto",
      "✅ Dosificación personalizada",
      "✅ Stack de suplementos profesional"
    ],
    icono: "💊",
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    titulo: "📊 Revisión Semanal y Ajustes Constantes",
    descripcion: "Seguimiento profesional continuo para garantizar resultados óptimos semana tras semana.",
    detalles: [
      "✅ Seguimiento detallado de progreso",
      "✅ Ajustes personalizados al plan",
      "✅ Resolución inmediata de dudas",
      "✅ Soporte 24/7 vía WhatsApp"
    ],
    icono: "📊",
    color: "from-red-500 to-red-700"
  }
];

const beneficiosExtras = [
  { icono: "🎯", texto: "Resultados Garantizados" },
  { icono: "📱", texto: "App Exclusiva de Seguimiento" },
  { icono: "🏆", texto: "Certificado al Completar" },
  { icono: "👥", texto: "Comunidad VIP" },
  { icono: "📚", texto: "Guías PDF Descargables" },
  { icono: "🔄", texto: "Actualizaciones de por Vida" }
];

export default function Home() {
  // ✅ SIN NEXTAUTH - Eliminado como acordamos
  // const { data: session } = useSession();

  const handleCompra = () => {
    window.open(`https://wa.me/52${planTransformacion.telefono}?text=¡Hola! Quiero información sobre el Plan de Transformación de 12 Semanas 💪`, '_blank');
  };

  const calcularDescuento = () => {
    return Math.round(((planTransformacion.precio_original - planTransformacion.precio_promocional) / planTransformacion.precio_original) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section con Imagen de Fondo */}
      <section 
        className="relative text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gnasesorias.png')",
          minHeight: '600px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              🏆 {planTransformacion.titulo}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Transforma tu cuerpo y tu vida con el programa más completo de México 🇲🇽
            </p>
            
            {/* Precio Promocional Destacado */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <div className="text-center">
                <div className="text-red-400 text-lg line-through mb-2">
                  Precio Regular: ${planTransformacion.precio_original.toLocaleString()} MXN
                </div>
                <div className="text-6xl font-bold text-green-400 mb-4">
                  ${planTransformacion.precio_promocional.toLocaleString()}
                  <span className="text-2xl text-white ml-2">MXN</span>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-lg font-semibold inline-block">
                  🔥 ¡{calcularDescuento()}% DE DESCUENTO! 🔥
                </div>
                <p className="text-lg mt-4 text-gray-200">
                  💰 Ahorra $1,000 MXN - Oferta por tiempo limitado
                </p>
              </div>
            </div>

            <button 
              onClick={handleCompra}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              🚀 ¡COMENZAR MI TRANSFORMACIÓN!
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Incluidos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              🎯 Todo lo que Incluye tu Transformación
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un sistema completo e integrado diseñado para garantizar tu éxito en las próximas 12 semanas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviciosIncluidos.map((servicio) => (
              <div key={servicio.id} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{servicio.icono}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {servicio.descripcion}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {servicio.detalles.map((detalle, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="mr-3 text-lg">{detalle}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-6 h-2 rounded-full bg-gradient-to-r ${servicio.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Extras */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">🎁 Beneficios Exclusivos Adicionales</h2>
          <p className="text-xl mb-12 text-gray-300">Todo esto y más por el mismo precio</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {beneficiosExtras.map((beneficio, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/10">
                <div className="text-4xl mb-3">{beneficio.icono}</div>
                <p className="text-sm font-medium">{beneficio.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cronograma de Transformación */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              📅 Tu Cronograma de Transformación
            </h2>
            <p className="text-xl text-gray-600">12 semanas estructuradas para resultados máximos</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Semanas 1-3</h3>
              <p className="text-gray-600">Adaptación y fundamentos</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-2">Semanas 4-6</h3>
              <p className="text-gray-600">Construcción de fuerza</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-2">Semanas 7-9</h3>
              <p className="text-gray-600">Intensificación y definición</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Semanas 10-12</h3>
              <p className="text-gray-600">Perfeccionamiento final</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            🚀 ¿Listo para tu Transformación Total?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No esperes más. Tu mejor versión te está esperando. Inicia hoy mismo tu journey hacia el éxito.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto mb-8">
            <div className="text-3xl font-bold mb-2">
              ${planTransformacion.precio_promocional.toLocaleString()} MXN
            </div>
            <div className="text-lg">12 semanas completas</div>
            <div className="text-sm text-green-200 mt-2">
              🎯 Garantía de resultados
            </div>
          </div>

          <button 
            onClick={handleCompra}
            className="bg-white text-green-600 text-2xl font-bold px-12 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 mb-6"
          >
            💬 CONTACTAR VÍA WHATSAPP
          </button>
          
          <div className="text-lg">
            📍 {planTransformacion.ubicacion}<br/>
            📞 {planTransformacion.telefono}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">💪 Suplementos de los Campeones GN</h3>
            <p className="text-gray-400">Tu aliado en la transformación física</p>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">
              &copy; 2024 Suplementos de los Campeones GN. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
