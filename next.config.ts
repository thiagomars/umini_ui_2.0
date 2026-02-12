import type { NextConfig } from "next";

const nextConfig = {
    output: 'export', // Se estiver usando exportação estática
    images: {
        unoptimized: true, // Adicione esta linha
    },
    // basePath: '/umini_ui', // Substitua pelo nome do seu repo
    // assetPrefix: '/nome-do-repositorio/',
};

export default nextConfig;
