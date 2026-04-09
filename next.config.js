/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { dev }) => {
    // On Windows, filesystem cache can occasionally corrupt/lock in dev,
    // leading to missing chunk modules (e.g. "Cannot find module './xxx.js'").
    if (dev) config.cache = false
    return config
  },
}

module.exports = nextConfig
