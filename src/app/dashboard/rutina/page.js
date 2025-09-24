"use client";
import { useEffect, useState } from "react";
import PDFIframeViewer from "@/components/PDFIframeViewer";

export default function Rutina() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { fetchRutinas(); }, []);

  const fetchRutinas = async () => {
    try {
      setLoading(true);
      const userEmail = localStorage.getItem('userEmail') || 'usuario@ejemplo.com';
      const response = await fetch(`/api/asesorias/me?tipo=plan&userEmail=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setPdfs(data);
      } else {
        setError('Error al cargar las rutinas de entrenamiento');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
    </div>
  );
  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-600 text-xl mb-4">❌ {error}</div>
      <button 
        onClick={fetchRutinas}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >🔄 Reintentar</button>
    </div>
  );
  if (pdfs.length === 0) return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🏋️‍♂️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes rutinas de entrenamiento</h2>
      <p className="text-gray-600">Tu administrador aún no te ha asignado rutinas de entrenamiento.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏋️‍♂️ Mi Rutina de Entrenamiento</h1>
          <p className="text-gray-600">Tienes {pdfs.length} rutina(s) de entrenamiento asignadas</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💪 Rutinas Disponibles</h2>
              <div className="space-y-3">
                {pdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPdf?.id === pdf.id 
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedPdf(pdf)}
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{pdf.title}</h3>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(pdf.createdAt).toLocaleDateString('es-ES')}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Plan de Entrenamiento
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {selectedPdf ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{selectedPdf.title}</h2>
                    <a
                      href={selectedPdf.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      📥 Descargar PDF
                    </a>
                  </div>
                  <PDFIframeViewer url={selectedPdf.pdfUrl} title={selectedPdf.title} />
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <div className="text-6xl mb-4">👈</div>
                  <p>Selecciona una rutina de entrenamiento para visualizarla</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}