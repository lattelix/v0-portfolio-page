/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lattelix.ru' }],
        destination: 'https://lattelix.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig