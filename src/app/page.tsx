"use client";
import LayoutSearch from "@/components/search/layoutsearch";
import SliceVoucher from "@/components/home-component/slice-voucher";
import TourIn from "@/components/home-component/frame-tour-in";
import Image from "next/image";
import TourOut from "@/components/home-component/frame-tour-out";
import NewInfor from "@/components/home-component/new-infor";
import { useTourStore } from "@/store/mainstore";
import { use, useEffect } from "react";
import Loading from "@/app/loading";
export default function Home() {
  const { tours, loading, error, fetchTours } = useTourStore();
  useEffect(() => {
    if (tours.length === 0) {
      fetchTours();
    }
  }, []);

  if (loading) {
    <Loading />;
  }
  console.log("Tours data:", tours);
  return (
    <>
      <LayoutSearch />
      <SliceVoucher />
      <TourIn toursall={tours} />
      <Image
        src={"/banner-4.png"}
        alt="Banner-4"
        width={1280}
        height={500}
        className="object-cover m-auto mt-20"
      />
      <TourOut toursall={tours} />
      <Image
        src={"/banner-5.png"}
        alt="Banner-4"
        width={1280}
        height={500}
        className="object-cover m-auto mt-20"
      />
      <NewInfor />
    </>
  );
}
