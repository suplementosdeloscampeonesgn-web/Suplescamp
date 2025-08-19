"use client";

// ✅ SIN NEXTAUTH - Eliminado como acordamos
// import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  // ✅ SIMULACIÓN DE USUARIO - Sin NextAuth
  const router = useRouter();
  const [progress, setProgress] = useState({
    week: 1,
    weight: '',
    measurements: {
      chest: '',
      waist: '',
      arms: '',
      legs: ''
    },
    notes: ''
  });

  // ✅ SIMULACIÓN DE DATOS DE USUARIO
  const simulatedUser = {
    name: 'Usuario Demo',
    email: 'demo@suplementosgn.com',
    startDate: new Date(Date.now() - (21 * 24 * 60 * 60 * 1000)) // 3 semanas atrás
  };

  // ✅ VERIFICACIÓN SIMULADA (sin NextAuth)
  useEffect(() => {
    // En la implementación real, aquí verificarías la sesión con NextAuth
    const isAuthenticated = true; // Simulado - siempre autenticado en demo
    
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router]);

  const calculateWeek = () => {
    if (!simulatedUser.startDate) return 1;
    const start = new Date(simulatedUser.startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // ✅ Corregido: sin escapes
    return Math.min(Math.ceil(diffDays / 7), 12);
  };

  const currentWeek = calculateWeek();
  const progressPercentage = (currentWeek / 12) * 100; // ✅ Corregido: sin escapes

  const handleUpdateProgress = async () => {
    try {
      // ✅ SIMULACIÓN DE API (reemplazar con API real después)
      // const response = await fetch('/api/user/progress', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     userId: simulatedUser.id,
      //     progress
      //   })
      // });

      // Simulación de respuesta exitosa
      setTimeout(() => {
        alert('✅ Progreso simulado actualizado exitosamente!\n\nEn la implementación final se guardará en MongoDB');
      }, 500);

    } catch (error) {
      alert('❌ Error al actualizar progreso');
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProgress(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProgress(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Funciones para los enlaces rápidos
  const handleWorkoutPlan = () => {
    alert('📋 Abriendo tu plan de entrenamiento personalizado...\n\n¡Próximamente tendrás acceso completo a tu rutina semanal!');
  };

  const handleNutritionPlan = () => {
    alert('🥗 Abriendo tu plan nutricional personalizado...\n\n¡Próximamente tendrás acceso a tu menú semanal y recetas!');
  };

  const handleSupplements = () => {
    alert('💊 Abriendo guía de suplementos...\n\n¡Próximamente tendrás tu protocolo de suplementación detallado!');
  };

  const handleContactAdvisor = () => {
    window.open(`https://wa.me/524443166595?text=¡Hola! Soy ${simulatedUser.name} y necesito ayuda con mi plan de transformación 💪\n\nSemana actual: ${currentWeek}/12`, '_blank'); // ✅ Corregido: sin escapes
  };

  const handleLogout = () => {
    alert('🚪 Cerrando sesión simulada...\n\nEn la implementación final usaremos NextAuth');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header del Dashboard */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                💪 Mi Dashboard - Suplementos De Los Campeones GN
              </h1>
              <p className="text-gray-300">¡Hola, {simulatedUser.name}!</p>
              <p className="text-xs text-gray-400">
                🚧 Versión Demo - MongoDB y NextAuth se implementarán al final
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                🏠 Inicio
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mensaje de Desarrollo */}
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-bold text-white mb-3">
                🚧 Dashboard en Desarrollo
              </h2>
              <p className="text-gray-300 text-sm mb-3">
                Esta es una versión demo. Al final implementaremos:
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-300">
                  ✅ <span className="ml-1">MongoDB para datos reales</span>
                </div>
                <div className="flex items-center text-gray-300">
                  ✅ <span className="ml-1">NextAuth para autenticación</span>
                </div>
                <div className="flex items-center text-gray-300">
                  ✅ <span className="ml-1">Stripe para pagos</span>
                </div>
                <div className="flex items-center text-gray-300">
                  ✅ <span className="ml-1">Sistema de progreso real</span>
                </div>
              </div>
            </div>

            {/* Progreso del Plan */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                🏆 Plan de Transformación de 12 Semanas
              </h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Progreso General</span>
                  <span className="text-green-400 font-bold">Semana {currentWeek}/12</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }} // ✅ Corregido: sin escapes
                  ></div>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {progressPercentage.toFixed(1)}% completado
                </p>
              </div>

              {/* Cronograma Actual */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <h3 className="text-lg font-bold text-blue-300 mb-2">🏋️‍♂️ Entrenamiento</h3>
                  <p className="text-gray-300 text-sm">
                    {currentWeek <= 3 && "Adaptación y fundamentos"}
                    {currentWeek > 3 && currentWeek <= 6 && "Construcción de fuerza"}
                    {currentWeek > 6 && currentWeek <= 9 && "Intensificación y definición"}
                    {currentWeek > 9 && "Perfeccionamiento final"}
                  </p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <h3 className="text-lg font-bold text-green-300 mb-2">🥗 Nutrición</h3>
                  <p className="text-gray-300 text-sm">Plan alimentario semana {currentWeek}</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <h3 className="text-lg font-bold text-purple-300 mb-2">💊 Suplementos</h3>
                  <p className="text-gray-300 text-sm">Stack optimizado activo</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <h3 className="text-lg font-bold text-red-300 mb-2">📊 Seguimiento</h3>
                  <p className="text-gray-300 text-sm">Revisión semanal programada</p>
                </div>
              </div>
            </div>

            {/* Formulario de Progreso */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">📈 Actualizar Mi Progreso</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    ⚖️ Peso Actual (kg)
                  </label>
                  <input
                    type="number"
                    value={progress.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="70"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    📝 Notas de la Semana
                  </label>
                  <textarea
                    value={progress.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="¿Cómo te has sentido esta semana?"
                    rows="3"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">📏 Medidas Corporales (cm)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-300 text-xs mb-1">Pecho</label>
                    <input
                      type="number"
                      value={progress.measurements.chest}
                      onChange={(e) => handleInputChange('measurements.chest', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs mb-1">Cintura</label>
                    <input
                      type="number"
                      value={progress.measurements.waist}
                      onChange={(e) => handleInputChange('measurements.waist', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="80"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs mb-1">Brazos</label>
                    <input
                      type="number"
                      value={progress.measurements.arms}
                      onChange={(e) => handleInputChange('measurements.arms', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="35"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs mb-1">Piernas</label>
                    <input
                      type="number"
                      value={progress.measurements.legs}
                      onChange={(e) => handleInputChange('measurements.legs', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="60"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpdateProgress}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                💾 Guardar Progreso (Demo)
              </button>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Estadísticas Rápidas */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">📊 Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Semana Actual:</span>
                  <span className="text-green-400 font-bold">{currentWeek}/12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Progreso:</span>
                  <span className="text-blue-400 font-bold">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plan:</span>
                  <span className="text-purple-400 font-bold">Transformación</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Estado:</span>
                  <span className="text-yellow-400 font-bold">Demo</span>
                </div>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">🔗 Enlaces Rápidos</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleWorkoutPlan}
                  className="w-full text-left text-gray-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  📋 Plan de Entrenamiento
                </button>
                <button 
                  onClick={handleNutritionPlan}
                  className="w-full text-left text-gray-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  🥗 Plan Nutricional
                </button>
                <button 
                  onClick={handleSupplements}
                  className="w-full text-left text-gray-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  💊 Guía de Suplementos
                </button>
                <button 
                  onClick={handleContactAdvisor}
                  className="w-full text-left text-gray-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  📞 Contactar Asesor
                </button>
              </div>
            </div>

            {/* Motivación */}
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-bold text-white mb-2">💪 Motivación del Día</h3>
              <p className="text-gray-300 text-sm italic">
                "El éxito no es el final, el fracaso no es fatal: es el coraje de continuar lo que cuenta."
              </p>
            </div>

            {/* Próximas Implementaciones */}
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">🔧 Próximas Implementaciones</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">🔄</span>
                  Autenticación real con NextAuth
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">🔄</span>
                  Base de datos MongoDB
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">🔄</span>
                  Pagos con Stripe
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-2">🔄</span>
                  Seguimiento real de progreso
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
