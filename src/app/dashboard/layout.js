"use client";
import DashboardTabs from "@/components/DashboardTabs";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative">
      {/* Encabezado superior */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-green-200 bg-white/70 sticky top-0 z-30">
        <h1 className="text-2xl font-semibold text-green-800 drop-shadow-sm tracking-tight">
          Asesorias GN
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold shadow transition-all duration-200 active:scale-95 ring-2 ring-red-200 focus:outline-none"
        >
          <span className="text-lg">🔒</span>
          Cerrar sesión
        </button>
      </header>
      
      <DashboardTabs />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  );
}