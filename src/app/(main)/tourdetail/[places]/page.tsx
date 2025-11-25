"use client";

import FilterForm from "@/app/(main)/tourdetail/filtertour";
import { useEffect, useState } from "react";
import TourCard from "@/components/home-component/tour-card";
import { useInCountryStore } from "@/store/incountryStore";
import { useOutCountryStore } from "@/store/outcountryStore";
import { usePathname } from "next/navigation";
import { getTours } from "@/api/tourApi";
import { getTourTypesTree, TourTypeResponse } from "@/api/tourTypeApi";
import { flattenTourTypes, findTourTypeByValue } from "@/utils/tourTypeHelpers";

export default function Page() {
  const [tourshow, setTourshow] = useState<any>([]);
  const [tourTypes, setTourTypes] = useState<TourTypeResponse[]>([]);
  const [allTourTypes, setAllTourTypes] = useState<TourTypeResponse[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch tour types khi component mount
  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        setLoading(true);
        const data = await getTourTypesTree();
        setTourTypes(data);

        // Flatten tree structure using helper
        const flattened = flattenTourTypes(data);
        setAllTourTypes(flattened);

        console.log("✅ Tour types loaded:", {
          tree: data,
          flattened: flattened,
        });
      } catch (error) {
        console.error("❌ Error fetching tour types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourTypes();
  }, []);

  // Find current tour type using helper
  const currentTourType = findTourTypeByValue(allTourTypes, pivotfilter);

  // Load tours based on filter
  useEffect(() => {
    async function loadTours() {
      // Chờ tour types load xong
      if (loading || allTourTypes.length === 0) {
        return;
      }

      console.log(`📍 Loading tours for: ${pivotfilter}`);

      try {
        // Case 1: "trongnuoc" - Tất cả tours trong nước
        if (pivotfilter === "trongnuoc") {
          console.log("→ Showing all domestic tours");
          setTourshow(inTours);
          return;
        }

        // Case 2: "nuocngoai" - Tất cả tours nước ngoài
        if (pivotfilter === "nuocngoai") {
          console.log("→ Showing all international tours");
          setTourshow(outTours);
          return;
        }

        // Case 3: Specific region (mienbac, chaua, etc.)
        if (currentTourType?.id) {
          console.log(
            `→ Fetching tours for type ID: ${currentTourType.id} (${currentTourType.name})`
          );
          const res = await getTours(0, 100, currentTourType.id);
          console.log(`✅ Loaded ${res.data.tours.length} tours`);
          setTourshow(res.data.tours);
        } else {
          console.warn(`⚠️ No tour type found for: ${pivotfilter}`);
          setTourshow([]);
        }
      } catch (error) {
        console.error("❌ Error loading tours:", error);
        setTourshow([]);
      }
    }

    loadTours();
  }, [pivotfilter, inTours, outTours, currentTourType, allTourTypes, loading]);

  return (
    <div className="flex mt-6 mb-10 xl:w-[1280px] m-auto">
      <FilterForm />
      <div className="flex ml-4 gap-2 flex-wrap">
        {loading ? (
          <div className="w-full text-center py-10">
            <p className="text-gray-500">Đang tải tour types...</p>
          </div>
        ) : tourshow && tourshow.length > 0 ? (
          tourshow.map((tour: any) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <div className="w-full text-center py-10">
            <p className="text-gray-500">
              {currentTourType
                ? `Không có tour nào cho ${currentTourType.name}`
                : "Không tìm thấy loại tour"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
