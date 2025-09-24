"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar PDFViewer dinámicamente para evitar SSR
const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false });

export default function UserPlanes() {
  const [planes, setPlanes] = useState([]);
  const [planesPorTipo, setPlanesPorTipo] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    try {
      const response = await fetch('/api/users/me/myplan');
      const data = await response.json();

      if (data.success) {
        setPlanes(data.asesorias);
        setPlanesPorTipo(data.planesPorTipo);
      }
    } catch (error) {
      console.error('Error fetching planes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTipoPlanInfo = (tipo) => {
    switch (tipo) {
      case 'entrenamiento':
        return { emoji: '🏋️', name: 'Entrenamiento', color: 'bg-blue-50 border-blue-200' };
      case 'suplementacion':
        return { emoji: '💊', name: 'Suplementación', color: 'bg-green-50 border-green-200' };
      case 'alimentacion':
        return { emoji: '🍽️', name: 'Alimentación', color: 'bg-orange-50 border-orange-200' };
      default:
        return { emoji: '📄', name: 'Documento', color: 'bg-gray-50 border-gray-200' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando tus planes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📋 Mis Planes</h1>
          <p className="text-gray-600 mt-2">Aquí encontrarás todos tus planes personalizados</p>
        </div>

        {planes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes planes asignados
            </h3>
            <p className="text-gray-600">
              Cuando tu entrenador te asigne planes, aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(planesPorTipo).map(([tipo, planesDelTipo]) => {
              const tipoInfo = getTipoPlanInfo(tipo);
              
              return (
                <div key={tipo} className={`bg-white rounded-lg shadow-md border-2 ${tipoInfo.color}`}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                      <span className="text-3xl mr-3">{tipoInfo.emoji}</span>
                      {tipoInfo.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{planesDelTipo.length} plan(es) disponible(s)</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {planesDelTipo.map((plan) => (
                        <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {plan.title}
                              </h3>
                              <div className="text-sm text-gray-500 space-y-1">
                                <p>📁 Archivo: {plan.filename}</p>
                                <p>📅 Creado: {formatDate(plan.createdAt)}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => setSelectedPlan(plan)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                👁️ Ver Plan
                              </button>
                              <a
                                href={plan.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                              >
                                📥 Descargar
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal para visualizar PDF */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedPlan.title}</h3>
                  <p className="text-sm text-gray-600">{getTipoPlanInfo(selectedPlan.tipo).name}</p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 80px)' }}>
                <PDFViewer 
                  pdfUrl={selectedPlan.pdfUrl} 
                  title={selectedPlan.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
