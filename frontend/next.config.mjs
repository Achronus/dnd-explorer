/** @type {import('next').NextConfig} */

import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const loadEnv = (filePath) => {
  const env = dotenv.config({ path: filePath });
  dotenvExpand.expand(env);
};

loadEnv(path.resolve(process.cwd(), ".env"));
loadEnv(path.resolve(process.cwd(), ".env.local"));

// const localhostUrl = `http://${process.env.HOST}:${process.env.BAK_PORT}`;
const localhostUrl = `http://backend:${process.env.BAK_PORT}`;

const localEnv = {
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
};

const nextConfig = {
  env: localEnv,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? `${localhostUrl}/api/:path*`
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? `${localhostUrl}/docs`
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? `${localhostUrl}/openapi.json`
            : "/api/openapi.json",
      },
    ];
  },
};

export default nextConfig;
