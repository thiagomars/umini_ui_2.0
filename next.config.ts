import type { NextConfig } from "next";

const nextConfig = {
    output: 'export', // Se estiver usando exportação estática
    images: {
        unoptimized: true, // Adicione esta linha
    },
    basePath: '/umini_ui_2.0', // Substitua pelo nome do seu repo
    assetPrefix: '/umini_ui_2.0/',
};

export default nextConfig;
