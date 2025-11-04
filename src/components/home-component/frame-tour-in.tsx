import TourCard from "@/components/home-component/tour-card";
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

interface TourInProps {
  toursall: Tour[];
}

export default function TourIn({ toursall }: TourInProps) {
  const [show, setShow] = useState<boolean>(false);

  const [showtourin, setshowtourIn] = useState<Tour[]>([]);

  const tourin = useMemo(() => {
    return toursall.filter((tour) => {
      return tour.area === "trongnuoc";
    });
  }, [toursall]);

  useEffect(() => {
    if (show) {
      setshowtourIn(tourin);
    } else {
      setshowtourIn(tourin.length > 5 ? tourin.slice(0, 4) : tourin);
    }
  }, [tourin, show]);

  const showTour = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <div className="xl:w-[1280px] m-auto mt-30">
      <h2 className="text-4xl text-[#4502c7] font-bold text-center">
        Tour Trong Nước
      </h2>
      <div className="flex gap-5 mt-12 flex-wrap">
        {showtourin.map((tour) => {
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
