"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Teléfono debe tener 10 dígitos';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // 🔥 Llamada real a tu API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Registro exitoso
        alert('🎉 ¡Registro exitoso! Tu cuenta ha sido creada y guardada en MongoDB.');
        router.push('/auth/login');
      } else {
        // ❌ Error del servidor (usuario ya existe, etc.)
        setErrors({ general: data.message });
      }

    } catch (error) {
      // ❌ Error de conexión
      console.error('Error:', error);
      setErrors({ general: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    // Limpiar error general también
    if (errors.general) {
      setErrors({
        ...errors,
        general: ''
      });
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
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Crear Cuenta
          </h2>
          <p className="text-gray-400">
            Únete a nuestra comunidad de campeones y transforma tu vida
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {/* Error general */}
          {errors.general && (
            <div className="mb-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              <p className="text-sm">{errors.general}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                👤 Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.name ? 'border-red-500' : 'border-white/30'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="Tu nombre completo"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

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
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.email ? 'border-red-500' : 'border-white/30'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                📱 Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.phone ? 'border-red-500' : 'border-white/30'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="4443166595"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
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
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.password ? 'border-red-500' : 'border-white/30'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                🔐 Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/30'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  Acepto los{' '}
                  <Link href="/terms" className="text-green-400 hover:text-green-300">
                    términos y condiciones
                  </Link>
                  {' '}y la{' '}
                  <Link href="/privacy" className="text-green-400 hover:text-green-300">
                    política de privacidad
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                '🚀 Crear Cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300">
                Inicia sesión aquí
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
