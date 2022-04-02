/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  images: {
    domains: [
      'd.gr-assets.com',
      'ia.media-imdb.com',
      'i.kinja-img.com',
      'oops-i-dont-work.jpg'
    ]
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  trailingSlash: true,
  optimizeImages: true,
  swcMinify: true
}

module.exports = nextConfig
