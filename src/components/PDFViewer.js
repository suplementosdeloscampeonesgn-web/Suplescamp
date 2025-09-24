"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configurar worker para react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl, title }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error) {
    setLoading(false);
    alert('Error al cargar PDF');
    console.error('PDF error:', error);
  }

  const gotoPrev = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const gotoNext = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  return (
    <div className="bg-white rounded-lg shadow p-6 my-8">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold">{title || "Documento PDF"}</div>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">Descargar</a>
      </div>
      <div className="flex flex-col items-center">
        {loading && <div className="mb-4">Cargando PDF...</div>}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="shadow"
        >
          <Page pageNumber={pageNumber} width={Math.min(800, typeof window !== "undefined" ? window.innerWidth - 100 : 400)} />
        </Document>
        {numPages &&
          <div className="flex items-center mt-4 space-x-4">
            <button onClick={gotoPrev} disabled={pageNumber === 1} className="px-3 py-1 bg-gray-200 rounded">Anterior</button>
            <span>{pageNumber} / {numPages}</span>
            <button onClick={gotoNext} disabled={pageNumber === numPages} className="px-3 py-1 bg-gray-200 rounded">Siguiente</button>
          </div>
        }
      </div>
    </div>
  );
}