/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages serves the site under /Portfolio — set by the deploy workflow.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true }
};

export default nextConfig;
