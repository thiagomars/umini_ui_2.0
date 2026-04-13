import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    headers: async () => {
        return [
            {
                source: '/videos/:path*',
                headers: [
                    { key: 'Accept-Ranges', 'value': 'bytes' },
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ]
    },
}

export default nextConfig;
