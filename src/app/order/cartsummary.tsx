"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartSummary() {
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm mt-6 ">
      {/* Header */}
      <div className="">
        <div className="flex justify-between items-center border-b pb-4 mb-4 ">
          <h2 className="text-xl font-bold text-purple-700">Giỏ Hàng</h2>
          <Link
            href="/"
            className="text-gray-500 hover:text-purple-600 text-sm flex items-center gap-1"
          >
            Quay lại mua hàng →
          </Link>
        </div>
        <div className="flex items-start gap-4 p-4  bg-white w-full ">
          {/* Ảnh tour */}
          <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
            <label>
              <input type="checkbox" />
            </label>

            <Image
              src="/blog-1.png" // đặt ảnh vào public/images
              alt="Tour Châu Âu Đón Noel"
              fill
              className="object-cover"
            />
          </div>

          {/* Thông tin tour */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Tour Châu Âu Đón Noel | 11N10D | Pháp – Thụy Sĩ – Ý
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Mã Tour:</span> 123456789
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Ngày Khởi Hành:</span> 20/10/2024
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Khởi Hành Tại:</span> Hà Nội
            </p>
          </div>
          {/* Số lượng hành khách */}
          <div className="  text-sm text-gray-700 flex flex-col gap-2 mr-3 ">
            <p className="text-[18px]">Số Lượng Hành Khách</p>
            <p>
              <span className="font-medium">Người lớn:</span> 1 x{" "}
              <span className="text-purple-600 font-semibold">10.000.000</span>
            </p>
            <p>
              <span className="font-medium">Trẻ em:</span> 0 x{" "}
              <span className="text-purple-600 font-semibold">7.990.000</span>
            </p>
            <p>
              <span className="font-medium">Em bé:</span> 0 x{" "}
              <span className="text-purple-600 font-semibold">5.990.000</span>
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Mã giảm giá */}
      <div className="flex gap-2 mb-6 ">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          // onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-purple-500"
        />
        <button
          // onClick={}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium"
        >
          Nhập mã
        </button>
      </div>

      {/* Tổng tiền */}
      <div className="space-y-1 text-gray-700 text-sm max-w-5xl">
        <div className="flex justify-between">
          <span>Tổng tiền:</span>
          {/* <span>{total.toLocaleString("vi-VN")} đ</span> */}
        </div>
        <div className="flex justify-between">
          <span>Giảm:</span>
          {/* <span className="text-red-600">
            -{discount.toLocaleString("vi-VN")} đ
          </span> */}
        </div>
        <div className="flex justify-between font-bold text-lg text-purple-700 mt-2">
          <span>Thanh toán:</span>
          {/* <span>{finalAmount.toLocaleString("vi-VN")} đ</span> */}
        </div>
      </div>
    </div>
  );
}
