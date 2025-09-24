"use client";
import { useState, useEffect } from 'react';

export default function PlanesList({ refresh }) {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    usuarioId: '',
    tipoPlan: ''
  });

  const fetchPlanes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.usuarioId) params.append('usuarioId', filters.usuarioId);
      if (filters.tipoPlan) params.append('tipoPlan', filters.tipoPlan);

      const response = await fetch(`/api/admin/planes?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setPlanes(data.planes);
      }
    } catch (error) {
      console.error('Error fetching planes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, [filters, refresh]);

  const handleDelete = async (planId) => {
    if (!confirm('¿Estás seguro de eliminar este plan?')) return;

    try {
      const response = await fetch(`/api/admin/planes?id=${planId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        alert('Plan eliminado exitosamente');
        fetchPlanes(); // Refrescar lista
      } else {
        alert('Error al eliminar plan');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTipoPlanEmoji = (tipo) => {
    switch (tipo) {
      case 'entrenamiento': return '🏋️';
      case 'suplementacion': return '💊';
      case 'alimentacion': return '🍽️';
      default: return '📄';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Lista de Planes</h2>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Usuario ID
          </label>
          <input
            type="text"
            value={filters.usuarioId}
            onChange={(e) => setFilters(prev => ({ ...prev, usuarioId: e.target.value }))}
            placeholder="ID del usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Tipo
          </label>
          <select
            value={filters.tipoPlan}
            onChange={(e) => setFilters(prev => ({ ...prev, tipoPlan: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los tipos</option>
            <option value="entrenamiento">Entrenamiento</option>
            <option value="suplementacion">Suplementación</option>
            <option value="alimentacion">Alimentación</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setFilters({ usuarioId: '', tipoPlan: '' })}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando planes...</p>
        </div>
      ) : planes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No se encontraron planes</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Título
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usuario ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {planes.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-2xl mr-2">{getTipoPlanEmoji(plan.tipo_plan)}</span>
                    <span className="text-sm text-gray-900 capitalize">{plan.tipo_plan}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{plan.titulo}</div>
                    <div className="text-sm text-gray-500">{plan.archivo_nombre}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {plan.usuario_id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(plan.fecha_creacion)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                    <a
                      href={plan.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                      👁️ Ver
                    </a>
                    <a
                      href={plan.archivo_url}
                      download
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                    >
                      📥 Descargar
                    </a>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
