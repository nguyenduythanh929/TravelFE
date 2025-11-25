// store/counterStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTours, TourListResponse, TourDetailResponse } from "@/api/tourApi";

type TourStore = {
  tours: TourDetailResponse[];
  loading: boolean;
  error: string | null;
  fetchTours: () => Promise<void>;
  clearTours: () => void;
};

export const useStore = create<TourStore>()(
  persist(
    (set) => ({
      tours: [],
      loading: false,
      error: null,

      fetchTours: async () => {
        set({ loading: true, error: null });
        try {
          const offset = 0;
          const res = await getTours(offset, 10);

          // res.data is TourListResponse, we need to extract the tours array
          set({ tours: res.data.tours, loading: false });
          console.log("Fetched tours:", res.data.tours);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
          set({ error: message, loading: false });
        }
      },

      clearTours: () => set({ tours: [] }),
    }),
    {
      name: "tour-storage", // 🔹 tên key lưu trong localStorage
      partialize: (state) => ({ tours: state.tours }), // chỉ lưu phần tours (không lưu loading/error)
    }
  )
);
