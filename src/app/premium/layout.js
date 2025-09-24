"use client";
import Link from 'next/link';

const sidebarItems = [
  { name: "Plan de Alimentación", href: "/premium/alimentacion" },
  { name: "Plan de Entrenamiento", href: "/premium/entrenamiento" },
  { name: "Plan de Suplementación", href: "/premium/suplementacion" },
  { name: "Duración de Planes", href: "/premium/duracion" },
  { name: "Panel de Seguimiento", href: "/premium/seguimiento" },
  { name: "Contacta a un Experto", href: "/premium/contacto" },
  { name: "Renueva tu Plan", href: "/premium/renovar" },
];

export default function PremiumLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <aside className="w-64 bg-gradient-to-b from-green-700 to-blue-800 p-6 flex flex-col shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">👑 Usuario Premium</h2>
        <nav className="space-y-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <Link
            href="/dashboard"
            className="block text-sm text-blue-200 hover:text-white transition"
          >
            ← Volver al Dashboard General
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-10 bg-white/5 rounded-l-3xl shadow-lg">
        {children}
      </main>
    </div>
  );
}
