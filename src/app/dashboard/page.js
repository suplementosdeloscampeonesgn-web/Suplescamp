"use client";

import Link from "next/link";
import Header from "../../components/Header";
import { useState } from "react";

export default function Dashboard() {
  // Estado simulado de progreso, ideal para conectar API después
  const [progreso, setProgreso] = useState({
    week: 1,
    weight: "",
    notes: "",
    measurements: {
      chest: "",
      waist: "",
      arms: "",
      legs: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("measurements.")) {
      const key = name.split(".")[1];
      setProgreso((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [key]: value
        }
      }));
    } else {
      setProgreso((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGuardar = () => {
    alert("¡Progreso guardado correctamente! (Demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-green-700 text-center mb-3">
            🏆 Dashboard del Usuario
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Bienvenido a tu panel. Lleva el control de tu progreso y accede a los recursos de tu plan.
          </p>
          {/* Progreso semanal */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Progreso Semanal</h2>
            <div className="flex gap-6 flex-wrap justify-between items-center">
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Semana Actual</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  name="week"
                  value={progreso.week}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg w-20"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Peso (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={progreso.weight}
                  onChange={handleChange}
                  placeholder="Ej. 70"
                  className="px-3 py-2 border rounded-lg w-32"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="block text-gray-700 mb-1 font-semibold">Notas</label>
                <textarea
                  name="notes"
                  value={progreso.notes}
                  onChange={handleChange}
                  rows="1"
                  className="px-3 py-2 border rounded-lg w-52"
                  placeholder="¿Cómo te fue esta semana?"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {["chest", "waist", "arms", "legs"].map((key) => (
                <div key={key}>
                  <label className="block text-gray-600 text-sm capitalize">{key === "chest" ? "Pecho" : key === "waist" ? "Cintura" : key === "arms" ? "Brazos" : "Piernas"}</label>
                  <input
                    type="number"
                    name={`measurements.${key}`}
                    value={progreso.measurements[key]}
                    onChange={handleChange}
                    placeholder={key === "chest" ? "Ej. 100" : key === "waist" ? "Ej. 80" : key === "arms" ? "Ej. 36" : "Ej. 60"}
                    className="px-3 py-2 border rounded-lg w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                onClick={handleGuardar}
              >
                💾 Guardar Progreso
              </button>
            </div>
          </div>
          {/* Accesos rápidos */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center text-center">
            <Link href="/planes" className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow font-bold transition">
              Ver Planes Disponibles
            </Link>
            <Link href="/cronograma" className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow font-bold transition">
              Cronograma de Cupos
            </Link>
            <Link href="/contacto" className="px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow font-bold transition">
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
