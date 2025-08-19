"use client";

import { useState } from 'react';
import Header from '../../components/Header';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'consulta-general',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de envío (reemplazar con API real después)
    setTimeout(() => {
      const whatsappMessage = `🔥 NUEVA CONSULTA - Suplementos GN 🔥%0A%0A👤 *Nombre:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A📱 *Teléfono:* ${formData.phone}%0A📋 *Asunto:* ${formData.subject}%0A%0A💬 *Mensaje:*%0A${formData.message}%0A%0A_Enviado desde la web de Suplementos De Los Campeones GN_`;
      
      window.open(`https://wa.me/524443166595?text=${whatsappMessage}`, '_blank');
      
      alert('✅ Mensaje enviado! Te contactaremos pronto');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'consulta-general',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectContact = (type) => {
    switch(type) {
      case 'whatsapp':
        window.open('https://wa.me/524443166595?text=¡Hola! Quiero información sobre sus servicios 💪', '_blank');
        break;
      case 'phone':
        window.open('tel:+524443166595');
        break;
      case 'email':
        window.open('mailto:info@suplementosgn.com');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            📞 Contáctanos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Estamos aquí para ayudarte en tu journey de transformación
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Información de Contacto */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                💬 Información de Contacto
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Ubicación</h3>
                      <p className="text-gray-600">Av. Vicente Rivera 131-A, Nuevo Paseo SLP</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
                      <p className="text-gray-600">4443166595</p>
                      <button 
                        onClick={() => handleDirectContact('whatsapp')}
                        className="text-green-600 hover:text-green-700 font-medium mt-1"
                      >
                        Enviar mensaje →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">gerardonoyola19@hotmail.com</p>
                      <button 
                        onClick={() => handleDirectContact('email')}
                        className="text-purple-600 hover:text-purple-700 font-medium mt-1"
                      >
                        Enviar email →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <span className="text-2xl">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Horarios</h3>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                      <p className="text-gray-600">Sábados: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acceso Rápido */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Contacto Rápido</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleDirectContact('whatsapp')}
                    className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-sm font-medium">WhatsApp</div>
                  </button>
                  <button
                    onClick={() => handleDirectContact('phone')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <div className="text-2xl mb-2">📞</div>
                    <div className="text-sm font-medium">Llamar</div>
                  </button>
                  <button
                    onClick={() => handleDirectContact('email')}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <div className="text-2xl mb-2">📧</div>
                    <div className="text-sm font-medium">Email</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                📝 Envíanos un Mensaje
              </h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      👤 Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      📧 Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      📱 Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="4443166595"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      📋 Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="consulta-general">Consulta General</option>
                      <option value="planes">Información sobre Planes</option>
                      <option value="precios">Consulta de Precios</option>
                      <option value="soporte">Soporte Técnico</option>
                      <option value="partnership">Oportunidades de Negocio</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      💬 Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      '🚀 Enviar Mensaje'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">💪 Suplementos De Los Campeones GN</h3>
            <p className="text-gray-400">Tu aliado en la transformación física</p>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">
              &copy; 2024 Suplementos De Los Campeones GN. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
