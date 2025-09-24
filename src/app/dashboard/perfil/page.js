"use client";
import { useEffect, useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/me")
      .then((r) => r.json())
      .then(setUser);
  }, []);

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Mi Perfil</h2>
      <p><b>Nombre:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Membresía:</b> {user.plan?.name ?? "Sin membresía"}</p>
      <p><b>Teléfono:</b> {user.phone ?? "No registrado"}</p>
    </div>
  );
}