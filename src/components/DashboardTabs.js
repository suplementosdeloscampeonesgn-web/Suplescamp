"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Mi Perfil", href: "/dashboard/perfil" },
  { label: "Mi Plan Actual", href: "/dashboard/plan" },
  { label: "Mi Rutina", href: "/dashboard/rutina" },
  { label: "Mi Dieta", href: "/dashboard/dieta" },
  { label: "Mi Suplementación", href: "/dashboard/suplementacion" }
];

export default function DashboardTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 bg-white/70 backdrop-blur p-4 rounded-b-xl shadow mb-8 mt-2">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-5 py-2 rounded-lg font-medium transition 
            ${pathname === tab.href
              ? "bg-green-600 text-white shadow"
              : "hover:bg-green-100 text-green-700 border-2 border-transparent hover:border-green-500"}
          `}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}