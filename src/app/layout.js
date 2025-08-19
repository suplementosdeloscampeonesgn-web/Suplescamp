import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'Suplementos De Los Campeones GN',
  description: 'Plan de Transformación de 12 Semanas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
