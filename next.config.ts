import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Imagens carregadas pelo painel /admin ficam no Vercel Blob.
        // Sem isto, o next/image recusa-as e a página parte depois de
        // se trocar uma fotografia na administração.
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
