import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida-public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/nosotros',
        destination: '/creativa-tesis/quienes-somos',
        permanent: true,
      },
      {
        source: '/exitos',
        destination: '/casos-de-exito',
        permanent: true,
      },
      {
        source: '/casos-exito',
        destination: '/casos-de-exito',
        permanent: true,
      },
      {
        source: '/calculadora-graduacion',
        destination: '/calculadoras/fecha-de-graduacion',
        permanent: true,
      },
      {
        source: '/calculadora-diagnostico',
        destination: '/calculadoras/cronograma-de-tesis',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
