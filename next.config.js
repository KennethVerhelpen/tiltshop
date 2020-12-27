module.exports = {
  images: {
    domains: ['tiltshop.co'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/sitemap-generator')
    }
    return config
  }
}