export default {
  async redirects() {
    const domains = [
      'shapereality.co',
      'shapereality.net',
      'shapereality.org',
      'shapereality.xyz',
      'weshapereality.com'
    ]

    const rules = domains.flatMap((domain) => [
      {
        source: '/:path*',
        has: [{ type: 'host', value: domain }],
        destination: 'https://shapereality.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${domain}` }],
        destination: 'https://shapereality.com/:path*',
        permanent: true,
      },
    ])

    return [...rules];
  },
  experimental: {
    ppr: true,
    // inlineCss: true, // disabled — conflicts with next/font in production
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
