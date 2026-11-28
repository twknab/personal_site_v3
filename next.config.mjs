/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` writes plain files to out/, which Firebase
  // Hosting serves. There is no server, so nothing regenerates between deploys.
  output: "export",
};

export default nextConfig;
