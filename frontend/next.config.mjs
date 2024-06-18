/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const loadEnv = (filePath) => {
  const env = dotenv.config({ path: filePath });
  dotenvExpand.expand(env);
};

loadEnv(path.resolve(process.cwd(), ".env"));
loadEnv(path.resolve(process.cwd(), ".env.local"));

const localEnv = {
  LOCALHOST_URL: `http://${process.env.HOST}:${process.env.BAK_PORT}`,
  UT_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
  UT_SECRET: process.env.UPLOADTHING_SECRET,
};

const nextConfig = {
  env: localEnv,
  images: {
    domains: ["uploadthing.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.UT_APP_ID}/*`,
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? `${process.env.LOCALHOST_URL}/api/:path*`
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? `${process.env.LOCALHOST_URL}/docs`
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? `${process.env.LOCALHOST_URL}/openapi.json`
            : "/api/openapi.json",
      },
    ];
  },
};

export default nextConfig;
