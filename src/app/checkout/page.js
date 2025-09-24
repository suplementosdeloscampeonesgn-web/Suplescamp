"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const servicios = [
  {
    id: 1,
    titulo: "🏋️‍♂️ Plan de Entrenamiento Personalizado",
    precio: 899,
    duracion: "10 semanas",
  },
  {
    id: 2,
    titulo: "🥗 Plan de Alimentación Estratégico",
    precio: 799,
    duracion: "8 semanas",
  },
  {
    id: 3,
    titulo: "💊 Plan de Suplementación Inteligente",
    precio: 699,
    duracion: "12 semanas",
  },
  {
    id: 4,
    titulo: "🏆 Plan Completo de Transformación",
    precio: 1999,
    originalPrice: 2999,
    duracion: "12 semanas",
  }
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const id = Number(searchParams.get("id"));
    const servicio = servicios.find(s => s.id === id);
    if (servicio) setPlan(servicio);
    else router.replace("/servicios");
  }, [searchParams, router]);

  if (!plan) return <div className="p-16 text-center">Cargando información del plan...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-green-200 p-10">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
          🛒 Checkout - {plan.titulo}
        </h2>

        <div className="mb-8 text-center">
          <span className="block text-gray-700 text-lg mb-2 font-semibold">
            Total: <span className="text-2xl text-green-600 font-extrabold">${plan.precio.toLocaleString()} MXN</span>
          </span>
          <span className="block text-md text-gray-500 mb-2">
            Duración: <span className="font-medium">{plan.duracion}</span>
          </span>
          {plan.originalPrice && (
            <span className="block text-md text-red-500 line-through mb-1">
              Antes: ${plan.originalPrice.toLocaleString()} MXN
            </span>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-2">
            💳 Datos para transferencia bancaria
          </h3>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="mb-2 text-base">
              <strong>Banco:</strong> BBVA
            </p>
            <p className="mb-2 text-base">
              <strong>CLABE</strong> <span className="font-mono text-lg text-blue-700">012700015107211127</span>
            </p>
            <p className="mb-2 text-base">
              <strong>Nombre del titular:</strong> <span className="font-medium text-blue-700">Gerardo Noyola Gonzalez</span>
            </p>
            <p className="mb-2 text-base">
              <strong>Concepto:</strong>{" "}
              <span className="bg-yellow-200 px-2 py-1 rounded">
                Tu nombre completo
              </span>
            </p>
          </div>
        </div>

        <div className="mb-10 text-center">
          <h4 className="font-semibold text-green-800 mb-2">
            📷 <span className="text-green-700">Envía la foto de tu transferencia</span>
          </h4>
          <p>
            Una vez realizada la transferencia, deberás enviar la foto/comprobante al WhatsApp: <br />
            <a
              href="https://wa.me/524443166595?text=Hola! Ya realicé mi pago para el plan, adjunto comprobante."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 underline hover:text-blue-900"
            >
              4443166595
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={() => {window.open("https://www.bbva.mx/personas/productos/tarjetas-de-debito.html", "_blank")}}
            className="bg-gradient-to-r from-blue-500 to-green-500 py-3 px-6 rounded-xl text-white font-bold text-lg shadow hover:scale-105 transition"
          >
            Abrir BBVA para transferir
          </button>
          <button
            onClick={() => router.push("/servicios")}
            className="bg-white py-2 px-3 rounded text-green-600 border border-green-300 font-medium shadow hover:bg-green-50 transition"
          >
            ← Elegir otro plan
          </button>
        </div>
      </div>
    </div>
  );
}