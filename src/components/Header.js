"use client";

// ✅ SIN NEXTAUTH - Solo navegación básica
// import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  // ✅ SIN SESIÓN - Solo router para navegación
  // const { data: session } = useSession();
  const router = useRouter();

  // ✅ NAVEGACIÓN SIMPLE - Sin lógica de autenticación
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleStartClick = () => {
    router.push('/auth/register');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  // ✅ NUEVAS FUNCIONES DE NAVEGACIÓN
  const handleServiciosClick = () => {
    router.push('/servicios');
  };

  const handleContactoClick = () => {
    router.push('/contacto');
  };

  const handleCronogramaClick = () => {
    // Opción A: Ir a página dedicada (recomendado)
    router.push('/cronograma');
    
    // Opción B: Scroll a sección en homepage (alternativa)
    // const element = document.getElementById('cronograma');
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // } else {
    //   router.push('/#cronograma');
    // }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-300" 
              onClick={handleLogoClick}
            >
              💪 <span className="ml-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Suplementos De Los Campeones GN</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {/* ✅ NAVEGACIÓN CON BOTONES FUNCIONALES */}
            <button 
              onClick={handleServiciosClick}
              className="hover:text-green-400 transition-all duration-300 flex items-center cursor-pointer group"
            >
              🎯 <span className="ml-1 group-hover:underline">Servicios</span>
            </button>
            <button 
              onClick={handleCronogramaClick}
              className="hover:text-green-400 transition-all duration-300 flex items-center cursor-pointer group"
            >
              📅 <span className="ml-1 group-hover:underline">Cronograma</span>
            </button>
            <button 
              onClick={handleContactoClick}
              className="hover:text-green-400 transition-all duration-300 flex items-center cursor-pointer group"
            >
              📞 <span className="ml-1 group-hover:underline">Contacto</span>
            </button>
          </nav>
          
          <div className="flex space-x-3">
            {/* ✅ BOTONES SIMPLES - Sin lógica de sesión */}
            <button 
              onClick={handleLoginClick}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 border border-white/20 flex items-center"
            >
              🔑 <span className="ml-1 hidden sm:inline">Iniciar Sesión</span>
              <span className="ml-1 sm:hidden">Login</span>
            </button>
            <button 
              onClick={handleStartClick}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-4 py-2 rounded-lg transition-all duration-300 shadow-lg flex items-center"
            >
              🚀 <span className="ml-1">Comenzar</span>
            </button>
          </div>
        </div>

        {/* ✅ SIN INFORMACIÓN DE USUARIO - Comentado
        {session && (
          <div className="mt-2 text-right">
            <p className="text-sm text-gray-300">
              ¡Hola, <span className="text-green-400 font-medium">{session.user.name}</span>! 👋
            </p>
          </div>
        )}
        */}
      </div>
    </header>
  );
}
