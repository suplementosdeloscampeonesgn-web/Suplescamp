"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de login (reemplazar con API después)
    setTimeout(() => {
      alert('🎉 Login simulado exitoso! \n\nEn la implementación final conectaremos con MongoDB');
      router.push('/dashboard');
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <h2 className="text-3xl font-bold text-gray-300 mb-8">
            Iniciar Sesión
          </h2>
          <p className="text-gray-400">
            Accede a tu plan de transformación personalizado
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
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
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
              />
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
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-green-400 hover:text-green-300 transition-colors duration-300">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                '🚀 Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => window.open('https://wa.me/524443166595?text=¡Hola! Quiero acceder a mi cuenta', '_blank')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-300"
              >
                📱 WhatsApp
              </button>
              <button 
                onClick={() => alert('📞 Contacto: 4443166595')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-300"
              >
                📞 Teléfono
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link href="/auth/register" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300">
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
