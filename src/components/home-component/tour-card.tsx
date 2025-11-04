"use client";

import Image from "next/image";
type Tour = {
  id: number;
  name: string;
  price: number;
  duration: string;
  thumbnail: string;
  place: string;
  location: string;
  area: string;
  departureDate: string;
  rating: number;
};
interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  if (!tour) {
    return;
  }
  return (
    <div
      className="w-[300px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg  transition-all duration-300
            hover:scale-[1.01] hover:-translate-y-2  transition p-3"
    >
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
        <img src={tour?.thumbnail} alt="tour" className="object-cover" />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
          <span>⚡</span> Giảm -30%
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 font-semibold text-[15px] leading-5">
        {tour?.name}
        <br /> Lorem ipsum dolor sit amet...
      </h3>

      {/* Prices */}
      <div className="mt-2 flex items-center gap-2">
        {/* <span className="line-through text-gray-400">13.650.000đ</span> */}
        <span className="text-red-600 font-bold">{tour?.price}đ</span>
      </div>

      {/* Info */}
      <div className="text-sm mt-2 space-y-1">
        <p>
          Mã Tour: <span className="text-blue-600">{tour?.id}</span>
        </p>
        <p>
          Ngày Khởi Hành:{" "}
          <span className="text-blue-600">{tour?.departureDate}</span>
        </p>
        <p>
          Thời Gian: <span className="font-medium">{tour.duration}</span>
        </p>
      </div>

      {/* Rating + slots */}
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-1 text-yellow-400 text-lg">
          ★ ★ ★ ★ ☆ <span className="text-black text-sm">{tour.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Số chỗ còn:</span>
          <span className="bg-red-600 text-white rounded-lg px-2 py-1 text-sm font-bold">
            10
          </span>
        </div>
      </div>
    </div>
  );
}
