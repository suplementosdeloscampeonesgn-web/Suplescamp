export default function DashboardHome() {
  return (
    <div className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        🎉 Bienvenido a tu Dashboard Fitness
      </h1>
      <p className="mb-8 text-center text-gray-500">
        Accede a tus recursos y tu progreso desde las pestañas superiores. 
        Navega fácilmente entre Perfil, Rutina, Dieta, Suplementación y mucho más.
      </p>
      <div className="flex flex-col items-center gap-4">
        <span className="text-7xl">💪🥗🏋️‍♂️</span>
      </div>
    </div>
  );
}