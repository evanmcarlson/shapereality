export default {
  async redirects() {
    const domains = [
      'shapereality.co',
      'shapereality.net',
      'shapereality.org',
      'shapereality.xyz',
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

    return [
      ...rules,
      {
        source: "/go/uncharted",
        destination: "https://ar.shapereality.com/uncharted",
        permanent: false, // 307 - keeps it updatable
      },
    ];
  },
  experimental: {
    ppr: true,
    inlineCss: true,
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
