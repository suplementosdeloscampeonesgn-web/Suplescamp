"use client";

import { useState } from "react";
import Header from "../../components/Header";

function calcularProximaFecha() {
  const hoy = new Date();
  const day = hoy.getDate();
  const mes = hoy.getMonth();
  const año = hoy.getFullYear();
  // Asume lotes cada 10 días
  const cicloActual = Math.floor((day - 1) / 10);
  const inicioCupo = new Date(año, mes, cicloActual * 10 + 1);
  const proximaApertura = new Date(inicioCupo);
  proximaApertura.setDate(inicioCupo.getDate() + 10);
  return proximaApertura;
}

export default function Cronograma() {
  // Simula los cupos del ciclo actual (puedes conectar API en producción)
  const [cuposDisponibles, setCuposDisponibles] = useState(0); // 0 = saturado, cambia a 1-10 para pruebas
  const [preregistrado, setPreregistrado] = useState(false);

  const proximaFecha = calcularProximaFecha();

  const handlePreregistro = (e) => {
    e.preventDefault();
    setPreregistrado(true);
    // Aquí enviarías los datos a tu backend/preregistro
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />

      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-2 text-center">
            📅 Cronograma de Asesorías Deportivas
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Cada 10 días se habilitan <span className="font-bold text-green-600">10 cupos</span> para asesorías personalizadas.
          </p>
          <div className="mx-auto w-full flex flex-col items-center mb-8">
            <div className={`rounded-xl px-8 py-6 shadow font-bold text-xl transition-all mb-3 ${cuposDisponibles > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {cuposDisponibles > 0
                ? `¡${cuposDisponibles} cupos disponibles!`
                : "Cupos agotados. Preregístrate para la próxima apertura"}
            </div>
            <div className="text-gray-500">
              {cuposDisponibles > 0
                ? "Inscríbete antes de que se acaben los lugares."
                : (
                  <>
                    Próxima apertura: <span className="text-green-600 font-semibold">{proximaFecha.toLocaleDateString()}</span>
                  </>
                )}
            </div>
          </div>

          {cuposDisponibles > 0 && (
            <div className="text-center">
              <button
                onClick={() => alert("¡Cupo reservado exitosamente! Un asesor se pondrá en contacto contigo.")}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-bold transition-all"
              >
                🚀 Apartar mi lugar
              </button>
            </div>
          )}

          {/* Pre-registro */}
          {cuposDisponibles === 0 && (
            <div className="mt-10">
              {!preregistrado ? (
                <form
                  onSubmit={handlePreregistro}
                  className="bg-white/90 rounded-2xl border px-6 py-8 shadow-lg flex flex-col gap-4"
                >
                  <h2 className="text-2xl font-bold text-green-700 text-center mb-3">Pré-regístrate</h2>
                  <p className="text-gray-600 text-center mb-5">
                    Recibe un aviso prioritario cuando se libere un nuevo cupo. 
                    Tu lugar se reservará automáticamente en cuanto estén disponibles.
                  </p>
                  <input
                    required
                    type="text"
                    placeholder="Nombre completo"
                    className="px-4 py-3 rounded border focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Correo electrónico"
                    className="px-4 py-3 rounded border focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                  >
                    📝 Preregistrarme
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="bg-green-100 text-green-700 px-6 py-4 rounded-lg shadow inline-block font-bold text-lg">
                    ✅ ¡Te has preregistrado exitosamente! Recibirás un email con la confirmación del cupo en el próximo ciclo.
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
