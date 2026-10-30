import fs from "node:fs";
import path from "node:path";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  outputFileTracingExcludes: {
    "*": ["**/*"],
  },
  webpack: (config, { isServer, dir }) => {
    if (isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("EnsurePagesManifestPlugin", () => {
            const manifestPath = path.join(dir, ".next", "server", "pages-manifest.json");
            if (!fs.existsSync(manifestPath)) {
              fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
              fs.writeFileSync(manifestPath, JSON.stringify({}), "utf-8");
            }
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
