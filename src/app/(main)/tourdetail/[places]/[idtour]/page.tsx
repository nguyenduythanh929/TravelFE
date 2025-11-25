"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getTourDetail } from "@/api/tourApi";
import { getTourBreadcrumb } from "@/utils/tourRegions";
import Breadcrumb from "@/components/breadcrumb";

import TourCardSumary from "./sumarytourdetail";
import TourPage from "./infortour";

type TourType = {
  id: number;
  name: string;
  avatar: string;
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
  tourTypeId?: number;
};
export default function Tourdetail() {
  const [data, setData] = useState<TourType | null>(null);
  const pathname = usePathname();
  const tourId = pathname.split("/").pop();

  useEffect(() => {
    async function fetchTourDetail() {
      const res = await getTourDetail(Number(tourId));
      const data = await res.data;
      setData(data);
    }
    fetchTourDetail();
  }, [tourId]);
  console.log("Tour Detail:", data);

  return (
    <div className="xl:w-[1280px] m-auto">
      <div className="flex">
        {data ? (
          <>
            <TourPage data={data} />
            <TourCardSumary data={data} />
          </>
        ) : (
          <div> Loading....</div>
        )}
      </div>
    </div>
  );
}
