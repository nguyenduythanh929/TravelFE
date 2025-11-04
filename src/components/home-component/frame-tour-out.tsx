import TourCard from "@/components/home-component/tour-card";
import { set } from "date-fns";
import { useEffect, useMemo, useState } from "react";

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
};

interface TouroutProps {
  toursall: Tour[];
}
export default function TourOut({ toursall }: TouroutProps) {
  const [show, setShow] = useState<boolean>(false);

  const [showtourout, setShowTourOut] = useState<Tour[]>([]);

  const tourout = useMemo(() => {
    return toursall.filter((tour) => {
      return tour.area === "nuocngoai";
    });
  }, [toursall]);

  useEffect(() => {
    if (show) {
      setShowTourOut(tourout);
    } else {
      setShowTourOut(tourout.length > 5 ? tourout.slice(0, 4) : tourout);
    }
  }, [tourout, show]);

  const showTour = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <div className="xl:w-[1280px] m-auto mt-30 ">
      <h2 className="text-4xl text-[#4502c7] font-bold text-center">
        Tour Nuớc Ngoài
      </h2>
      <div className="flex gap-5 mt-12 flex-wrap">
        {showtourout.map((tour) => {
          console.log(tour);
          return <TourCard key={tour.id} tour={tour} />;
        })}
      </div>
      <button
        onClick={showTour}
        className="text-blue-600 p-3 border-2 rounded-md border-blue-600 mt-10 mx-auto flex hover:bg-blue-600 hover:text-white transition"
      >
        {show ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
}
