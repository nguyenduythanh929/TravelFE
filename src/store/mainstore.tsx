// store/counterStore.ts
import { create } from "zustand";

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

type TourStore = {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  fetchTours: () => Promise<void>;
};

export const useTourStore = create<TourStore>((set) => ({
  tours: [],
  loading: false,
  error: null,

  fetchTours: async () => {
    set({ loading: true, error: null });
    try {
      const data = await (await fetch("http://localhost:5000/tours")).json(); // API thật hoặc mock
      //   const data = await res.json();
      set({ tours: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
