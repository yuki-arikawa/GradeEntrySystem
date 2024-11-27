import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Webpack 設定をカスタマイズ
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false, // async_hooks を無視
      };
    }
    return config;
  },
};

export default nextConfig;
