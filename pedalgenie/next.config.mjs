/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false, // Strict Mode 비활성화
  // image 호스트 추가
  images: {
    domains: ['musai-bucket.s3.ap-northeast-2.amazonaws.com'], // 허용할 이미지 호스트 추가
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
