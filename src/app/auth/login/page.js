"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
//import { useSession } from "next-auth/react";



export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  //const { data: session, status } = useSession();

  // Validar redirección por rol después de login
 // useEffect(() => {
   // if (session?.user?.role === "admin") {
     // router.replace("/mi-perfil");
    //} else if (session) {
     // router.replace("/dashboard");
    //}
  //}, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "El email es requerido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);

  const res = await signIn("credentials", {
    redirect: false,
    email: formData.email,
    password: formData.password,
  });

  setLoading(false);
  
if (res && res.ok) {
  localStorage.setItem('userEmail', formData.email); // Guardar email
  
  if (formData.email === "suplementosdeloscampeonesgn@gmail.com") {
    router.replace("/dashboardadmin");
  } else {
    router.replace("/dashboard");
  }
} else {
    setErrors({ general: "Usuario o contraseña incorrectos" });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              💪 Suplementos De Los Campeones GN
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-300 mb-4">Iniciar Sesión</h2>
          <p className="text-gray-400">Accede a tu panel de cliente</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {errors.general && (
            <div className="mb-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              <p className="text-sm">{errors.general}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                📧 Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                  errors.email ? "border-red-500" : "border-white/30"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                🔒 Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                  errors.password ? "border-red-500" : "border-white/30"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Ingresando...
                </div>
              ) : (
                "🚀 Ingresar"
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/login/register" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
        <div className="text-center">
          <Link 
            href="/"
            className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center justify-center"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}