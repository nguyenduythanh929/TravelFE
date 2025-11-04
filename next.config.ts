import type { NextConfig } from "next";

const nextConfig = {
  // ... các cấu hình khác
  images: {
    domains: [
      "www.google.com", // Thêm tên miền bị lỗi vào đây
      // Nếu hình ảnh thực tế đến từ royalstar.com.vn (theo URL bạn cung cấp),
      // bạn cũng nên thêm tên miền gốc đó nếu sử dụng trực tiếp:
      // 'royalstar.com.vn',
    ],
  },
};

export default nextConfig;
