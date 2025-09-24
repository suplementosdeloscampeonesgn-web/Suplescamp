"use client";
export default function PDFIframeViewer({ url, title = "" }) {
  return (
    <div className="w-full h-[75vh] flex flex-col items-center">
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        style={{ minHeight: "70vh", border: 0 }}
        allowFullScreen
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Descargar PDF
      </a>
    </div>
  );
}