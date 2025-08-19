"use client";

export default function Card({ titulo, descripcion, precio, duracion, icono, onComprar }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border hover:border-green-500">
      {/* Header con ícono */}
      <div className="mb-4">
        <div className="text-4xl mb-3 text-center">{icono}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          {titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-3 text-center">
          {descripcion}
        </p>
        <div className="text-sm text-green-600 font-medium text-center bg-green-50 py-1 px-3 rounded-full">
          📅 Duración: {duracion}
        </div>
      </div>

      {/* Precio y botón */}
      <div className="text-center mt-6">
        <div className="mb-4">
          <span className="text-3xl font-bold text-green-600">
            ${precio}
          </span>
          <span className="text-gray-500 text-sm ml-1">MXN</span>
        </div>
        
        <button 
          onClick={onComprar}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          🚀 Comenzar Ahora
        </button>
      </div>

      {/* Features */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>⭐ Personalizado</span>
          <span>📊 Seguimiento</span>
          <span>💬 Soporte</span>
        </div>
      </div>
    </div>
  );
}
