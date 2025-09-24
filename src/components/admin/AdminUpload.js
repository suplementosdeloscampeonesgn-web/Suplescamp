"use client";
import { useState } from 'react';

export default function AdminUpload({ onUploadSuccess }) {
  const [formData, setFormData] = useState({
    usuarioId: '',
    tipoPlan: 'entrenamiento',
    titulo: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setMessage('Solo se permiten archivos PDF');
      return;
    }
    setFormData(prev => ({
      ...prev,
      file: file
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file || !formData.usuarioId || !formData.titulo) {
      setMessage('Todos los campos son requeridos');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.file);
      uploadFormData.append('usuarioId', formData.usuarioId);
      uploadFormData.append('tipoPlan', formData.tipoPlan);
      uploadFormData.append('titulo', formData.titulo);

      const response = await fetch('/api/upload-plan', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Plan subido exitosamente');
        // Resetear formulario
        setFormData({
          usuarioId: '',
          tipoPlan: 'entrenamiento',
          titulo: '',
          file: null
        });
        // Reset file input
        document.getElementById('fileInput').value = '';
        
        // Callback para refrescar lista
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error de conexión');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Subir Nuevo Plan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Usuario ID */}
          <div>
            <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700 mb-1">
              ID del Usuario *
            </label>
            <input
              type="text"
              id="usuarioId"
              name="usuarioId"
              value={formData.usuarioId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12345"
              required
            />
          </div>

          {/* Tipo de Plan */}
          <div>
            <label htmlFor="tipoPlan" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Plan *
            </label>
            <select
              id="tipoPlan"
              name="tipoPlan"
              value={formData.tipoPlan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="entrenamiento">🏋️ Entrenamiento</option>
              <option value="suplementacion">💊 Suplementación</option>
              <option value="alimentacion">🍽️ Alimentación</option>
            </select>
          </div>
        </div>

        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título del Plan *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Plan de Entrenamiento Semanal"
            required
          />
        </div>

        {/* Archivo PDF */}
        <div>
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-1">
            Archivo PDF *
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Solo archivos PDF permitidos</p>
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            uploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {uploading ? '⏳ Subiendo...' : '📤 Subir Plan'}
        </button>
      </form>

      {/* Mensaje de estado */}
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
