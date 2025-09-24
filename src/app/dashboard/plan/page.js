"use client";
import { useState, useEffect } from "react";

export default function PlanActual() {
  const [plan, setPlan] = useState(null);
  const [planAssignment, setPlanAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyPlan();
  }, []);

  const fetchMyPlan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/me/myplan`);
      if (response.ok) {
        const data = await response.json();
        setPlan(data.plan);
        setPlanAssignment(data.planAssignment);
      } else if (response.status === 401) {
        setError('Debes iniciar sesión para ver tu plan.');
      } else if (response.status === 404) {
        setError('No tienes un plan activo asignado');
      } else {
        setError('Error al cargar tu plan');
      }
    } catch (error) {
      setError('Error de conexión o sesión expirada');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!planAssignment || !plan) return { progress: 0, currentWeek: 1, totalWeeks: 12, daysElapsed: 0 };
    const startDate = new Date(planAssignment.assignedAt || planAssignment.createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Corrige el regex aquí 👇
    const durationMatch = plan.duration.match(/(d+)/);
    const totalWeeks = durationMatch ? parseInt(durationMatch[1]) : 12;
    const currentWeek = Math.min(Math.ceil(diffDays / 7), totalWeeks);
    const progress = Math.min((currentWeek / totalWeeks) * 100, 100);
    return { 
      progress: Math.round(progress), 
      currentWeek: Math.max(currentWeek, 1), 
      totalWeeks,
      daysElapsed: diffDays
    };
  };

  const getPlanStatus = () => {
    if (!planAssignment || !plan) return 'activo';
    const { totalWeeks, daysElapsed } = calculateProgress();
    const totalDays = totalWeeks * 7;
    if (daysElapsed > totalDays + 7) return 'expirado';
    if (daysElapsed >= totalDays) return 'por-vencer';
    return 'activo';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'training': return '🏋️‍♂️';
      case 'nutrition': return '🥗';
      case 'supplements': return '💊';
      case 'complete': return '👑';
      default: return '📋';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'training': return 'from-blue-500 to-blue-700';
      case 'nutrition': return 'from-green-500 to-green-700';
      case 'supplements': return 'from-purple-500 to-purple-700';
      case 'complete': return 'from-yellow-500 to-yellow-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'expirado': return 'bg-red-100 text-red-800';
      case 'por-vencer': return 'bg-orange-100 text-orange-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'activo': return '✅ Activo';
      case 'expirado': return '❌ Expirado';
      case 'por-vencer': return '⚠️ Por Vencer';
      case 'pendiente': return '⏳ Pendiente';
      default: return '📋 Sin Estado';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sin Plan Activo</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">
            Contacta con tu administrador para que te asigne un plan de transformación.
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sin Plan Asignado</h2>
          <p className="text-gray-600">
            Aún no tienes un plan de transformación asignado.
          </p>
        </div>
      </div>
    );
  }

  const progressData = calculateProgress();
  const planStatus = getPlanStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Mi Plan Actual</h1>
          <p className="text-gray-600">Detalles completos de tu plan de transformación</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getTypeColor(plan.type)} p-8 text-white relative`}>
            {plan.isPopular && (
              <div className="absolute top-4 right-4">
                <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                  🔥 MÁS POPULAR
                </span>
              </div>
            )}
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-6xl">{getTypeIcon(plan.type)}</div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                <p className="text-lg opacity-90">{plan.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold mb-1">
                  ${plan.price.toLocaleString()} MXN
                </div>
                <div className="text-lg opacity-90">📅 {plan.duration}</div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(planStatus)}`}>
                  {getStatusText(planStatus)}
                </span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ${plan.price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Valor del Plan</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {plan.duration}
                </div>
                <p className="text-sm text-gray-600">Duración Total</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 capitalize">
                  {plan.type}
                </div>
                <p className="text-sm text-gray-600">Tipo de Plan</p>
              </div>
            </div>
            {(plan.features && Array.isArray(plan.features) && plan.features.length > 0) && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  ✨ Lo que incluye tu plan
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                    >
                      <div className="text-green-600 text-xl font-bold">✓</div>
                      <div className="text-gray-800 font-medium">{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              📈 Tu Progreso Real
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan Iniciado</span>
                  <span className="font-medium">
                    {planAssignment 
                      ? new Date(planAssignment.assignedAt || planAssignment.createdAt).toLocaleDateString('es-ES')
                      : new Date().toLocaleDateString('es-ES')
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      progressData.progress < 50 ? 'bg-blue-600' :
                      progressData.progress < 80 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{width: `${progressData.progress}%`}}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    Semana {progressData.currentWeek} de {progressData.totalWeeks}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {progressData.progress}% completado
                  </p>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📅 Han transcurrido {progressData.daysElapsed} días desde que iniciaste tu plan
                  </p>
                  {planStatus === 'por-vencer' && (
                    <p className="text-sm text-orange-700 mt-1 font-medium">
                      ⚠️ Tu plan está por vencer pronto
                    </p>
                  )}
                  {planStatus === 'expirado' && (
                    <p className="text-sm text-red-700 mt-1 font-medium">
                      ❌ Tu plan ha expirado. Contacta a tu administrador.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              💬 Soporte
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600">¿Tienes dudas sobre tu plan?</p>
              <button 
                onClick={() => window.open('https://wa.me/524443166595?text=Hola, tengo una consulta sobre mi plan de transformación', '_blank')}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>📱</span>
                <span>Contactar por WhatsApp</span>
              </button>
              <p className="text-sm text-gray-500 text-center">
                Soporte 24/7 disponible
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha de inicio:</span>
                    <span className="font-medium">
                      {planAssignment 
                        ? new Date(planAssignment.assignedAt || planAssignment.createdAt).toLocaleDateString('es-ES')
                        : 'No disponible'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha estimada de fin:</span>
                    <span className="font-medium">
                      {planAssignment 
                        ? new Date(new Date(planAssignment.assignedAt || planAssignment.createdAt).getTime() + (progressData.totalWeeks * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('es-ES')
                        : 'No disponible'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}