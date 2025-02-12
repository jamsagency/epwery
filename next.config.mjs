let userConfig = {};
try {
  const { default: importedConfig } = await import('./v0-user-next.config.mjs');
  userConfig = importedConfig;
} catch (e) {
  // User config not found, using defaults
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    // Remove the following two lines:
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
}

function mergeConfig(baseConfig, userConfig) {
  const mergedConfig = { ...baseConfig };

  for (const key in userConfig) {
    if (typeof baseConfig[key] === 'object' && !Array.isArray(baseConfig[key])) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...userConfig[key],
      };
    } else {
      mergedConfig[key] = userConfig[key];
    }
  }

  return mergedConfig;
}

const finalConfig = mergeConfig(nextConfig, userConfig);

export default finalConfig;

