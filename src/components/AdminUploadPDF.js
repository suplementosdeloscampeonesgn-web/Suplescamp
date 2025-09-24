"use client";
import { useState } from 'react';

export default function AdminUploadPDF({ selectedUser, onUploadSuccess }) {
  const [formData, setFormData] = useState({
    titulo: '',
    tipoPlan: 'entrenamiento',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setMessage('❌ Solo se permiten archivos PDF');
      return;
    }
    setFormData(prev => ({ ...prev, file }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      setMessage('❌ Selecciona un usuario primero');
      return;
    }

    if (!formData.file || !formData.titulo) {
      setMessage('❌ Completa todos los campos');
      return;
    }

    setUploading(true);
    setMessage('⏳ Subiendo a Firebase Storage...');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.file);
      uploadFormData.append('usuarioId', selectedUser.id);
      uploadFormData.append('tipoPlan', formData.tipoPlan);
      uploadFormData.append('titulo', formData.titulo);

      const response = await fetch('/api/upload-plan', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ PDF subido exitosamente a Firebase');
        // Resetear formulario
        setFormData({
          titulo: '',
          tipoPlan: 'entrenamiento',
          file: null
        });
        // Reset file input
        document.getElementById('pdfFileInput').value = '';
        
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

  if (!selectedUser) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-center">
          👆 Selecciona un usuario para subir un PDF
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        📤 Subir PDF para: <span className="text-green-600">{selectedUser.name}</span>
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título del PDF *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ej: Plan de Entrenamiento Semana 1"
              required
            />
          </div>

          <div>
            <label htmlFor="tipoPlan" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Plan *
            </label>
            <select
              id="tipoPlan"
              name="tipoPlan"
              value={formData.tipoPlan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="entrenamiento">🏋️ Entrenamiento</option>
              <option value="suplementacion">💊 Suplementación</option>
              <option value="alimentacion">🍽️ Alimentación</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="pdfFileInput" className="block text-sm font-medium text-gray-700 mb-1">
            Archivo PDF *
          </label>
          <input
            type="file"
            id="pdfFileInput"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Solo archivos PDF - Se subirá a Firebase Storage</p>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            uploading 
              ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {uploading ? '⏳ Subiendo a Firebase...' : '📤 Subir PDF (Firebase Storage)'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : message.includes('⏳')
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
