"use client";
import CartSummary from "@/app/order/cartsummary";
import PaymentForm from "@/app/order/inforcleint";

import { useEffect, useState } from "react";

type TourType = {
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
export default function Cart() {
  const [data, setData] = useState<TourType | null>(null);

  console.log("Tour Detail in Order Page:", data);
  return (
    <div>
      <CartSummary />
      <PaymentForm />
    </div>
  );
}
