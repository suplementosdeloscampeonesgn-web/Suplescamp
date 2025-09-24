/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Configuración para importar dependencias externas en el server (Next.js 15+)
  serverExternalPackages: [
    '@prisma/client',
    'bcryptjs'
  ],

  // ✅ Webpack config, compatible con SSR y PDF.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        encoding: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
      };
    }

    // Externalizar Prisma (opcional, pero ayuda para Vercel)
    config.externals.push('@prisma/client');

    // Alias para canvas, ayuda PDF.js
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    return config;
  },

  // ✅ Headers para servir PDFs con el content-type correcto
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;