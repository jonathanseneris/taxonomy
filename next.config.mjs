import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@mikro-orm/postgresql",
      "@mikro-orm/core",
      "@mikro-orm/cli",
      "@mikro-orm/entity-generator",
      "@mikro-orm/migrations",
      "@mikro-orm/reflection",
      "@mikro-orm/seeder",
    ],
  },
}

export default withContentlayer(nextConfig)
