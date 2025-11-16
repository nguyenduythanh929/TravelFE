"use client";

import { useState, useMemo } from "react";
import { FaCalendarAlt, FaBus, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";

type TourCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  isOnSale: boolean;
  startDate: [number, number, number];
  duration: string;
  remainSlot: number;
  rating: number;
  reviewCount: number;
  promotionName: string;
};

type formValue = {
  adults: number;
  children: number;
  babies: number;
};
type StartDate = [number, number, number];
function formatStartDate(startDate: StartDate) {
  const [year, month, day] = startDate;

  const yy = String(year).slice(-2); // 2025 -> "25"
  const mm = String(month).padStart(2, "0"); // 1 -> "01"
  const dd = String(day).padStart(2, "0"); // 15 -> "15"

  return `${yy}/${mm}/${dd}`;
}

export default function TourCardSumary({ data }: { data: any }) {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const tour = data;
  console.log("Tour data in TourCardSumary:", data);

  const total = useMemo(() => {
    return (
      adults * tour.priceAdult +
      children * tour.priceChild +
      babies * tour.priceInfant
    );
  }, [adults, children, babies]);
  if (!tour) {
    return <div>Loading...</div>;
  }

  const formatVND = (value: number) =>
    value
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "đ");
  // function handleClick() {}
  return (
    <div className="  max-w-sm bg-white rounded-2xl shadow p-5 w-[400px]">
      <h2 className="text-xl font-bold text-purple-700 mb-3">
        Chuyến Đi Của Bạn
      </h2>

      <img
        src={tour.images[0]}
        alt={tour.name}
        className="rounded-lg w-full mb-3"
      />

      <h3 className="text-gray-800 font-semibold mb-1">{tour.name}</h3>

      <div className="flex items-center text-yellow-400 mb-2">
        {"★".repeat(Math.floor(tour.rating))}
        {"☆".repeat(5 - Math.floor(tour.rating))}
        <span className="text-sm text-gray-600 ml-2">
          {tour.totalReviews} lượt đánh giá
        </span>
      </div>

      <div className="text-sm space-y-1 text-gray-700 mb-3">
        <div className="flex items-center gap-2">
          <FaTicketAlt /> <span>Mã Tour:</span> <strong>{tour.id}</strong>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt /> <span>Thời gian:</span> {tour.duration} ngày
        </div>
        <div className="flex items-center gap-2">
          <FaBus /> <span>Phương tiện:</span>
          {tour.transport}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt /> <span>Ngày khởi hành:</span>{" "}
          {formatStartDate(tour.departureDate)}
        </div>
      </div>

      <div className="mb-3">
        <label className="font-medium">Khởi hành tại:</label>
        <select
          className="w-full border rounded-lg p-2 mt-1"
          defaultValue={"ha noi"}
        >
          <option value="Hà Nội">Hà Nội</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        </select>
      </div>

      <div className="space-y-2 text-sm">
        <p className="font-medium">Số lượng hành khách</p>

        <div className="flex items-center justify-between">
          <label className="text-gray-700 flex">Người lớn:</label>
          <input
            type="number"
            min={0}
            className="w-16 border rounded text-center"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
          <span className="text-gray-600 w-20 text-right">
            {adults} x{" "}
            <span className="text-purple-700 font-semibold">
              {formatVND(tour.priceAdult)}
            </span>
          </span>
        </div>

        {/* Trẻ em */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 flex">Trẻ em:</label>
          <input
            type="number"
            min={0}
            className="w-16 border rounded text-center"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
          <span className="text-gray-600 w-20 text-right">
            {children} x{" "}
            <span className="text-purple-700 font-semibold">
              {formatVND(tour.priceChild)}
            </span>
          </span>
        </div>

        {/* Em bé */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 flex">Em bé:</label>
          <input
            type="number"
            min={0}
            className="w-16 border rounded text-center"
            value={babies}
            onChange={(e) => setBabies(Number(e.target.value))}
          />
          <span className="text-gray-600 w-20 text-right">
            {babies} x{" "}
            <span className="text-purple-700 font-semibold">
              {formatVND(tour.priceInfant)}
            </span>
          </span>
        </div>

        <hr className="my-4" />

        {/* Tổng cộng */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">
            Tổng cộng:
          </span>
          <span className="text-2xl font-bold text-purple-700">
            {formatVND(total)}
          </span>
        </div>
      </div>

      <Link href={"/order"}>
        <button
          // onClick={handleClick}
          className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg"
        >
          Thêm vào giỏ hàng
        </button>
      </Link>
    </div>
  );
}
