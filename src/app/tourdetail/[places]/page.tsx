"use client";

import FilterForm from "@/app/tourdetail/filtertour";
import { useEffect, useState } from "react";
import TourCard from "@/components/home-component/tour-card";
import { useInCountryStore } from "@/store/incountryStore";
import { useOutCountryStore } from "@/store/outcountryStore";
import { usePathname, useSearchParams } from "next/navigation";
import { getTours } from "../../api/tours/route";

const regions = [
  { id: 3, value: "bac", label: "Miền Bắc" },
  { id: 4, value: "trung", label: "Miền Trung" },
  { id: 5, value: "nam", label: "Miền Nam" },
  { id: 6, value: "chaua", label: "Châu á" },
  { id: 7, value: "chauau", label: "Châu âu" },
  { id: 8, value: "chauuc", label: "Châu úc" },
];

export default function Page() {
  const [tourshow, setTourshow] = useState<any>([]);

  const {
    tours: inTours,
    loading: inLoading,
    error: inError,
    fetchTours: fetchInTours,
  } = useInCountryStore();
  const {
    tours: outTours,
    loading: outLoading,
    error: outError,
    fetchTours: fetchOutTours,
  } = useOutCountryStore();

  const pathname = usePathname();
  const pivotfilter: string | undefined = pathname.split("/").pop();
  console.log(pivotfilter);
  const tourtypeid = regions.find((item) => item.value == pivotfilter);
  console.log("Tour Type ID:", tourtypeid?.id);
  useEffect(() => {
    async function loadTours() {
      if (pivotfilter === "trongnuoc") {
        setTourshow(inTours.tours);
        return;
      }

      if (pivotfilter === "nuocngoai") {
        setTourshow(outTours.tours);
        return;
      }

      if (tourtypeid?.id) {
        const res = await getTours(0, 4, tourtypeid.id);
        setTourshow(res.data.tours);
      }
    }

    loadTours();
  }, [pivotfilter, inTours.tours, outTours.tours, tourtypeid]);

  return (
    <div className="flex  mt-6 mb-10 xl:w-[1280px] m-auto">
      <FilterForm />
      <div className="flex ml-4 gap-2  flex-wrap">
        {tourshow ? (
          tourshow.map((tour: any) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
