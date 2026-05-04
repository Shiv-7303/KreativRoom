import type { NextConfig } from "next";
import WebpackObfuscator from "webpack-obfuscator";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator({
          compact: true,
          identifierNamesGenerator: "hexadecimal",
          rotateStringArray: true,
          selfDefending: true,
          simplify: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
        })
      );
    }

    return config;
  },
};

export default nextConfig;
