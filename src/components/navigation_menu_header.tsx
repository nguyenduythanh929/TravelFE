"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

import Link from "next/link";
const regions = [
  { id: 3, value: "bac", label: "Miền Bắc" },
  { id: 4, value: "trung", label: "Miền Trung" },
  { id: 5, value: "nam", label: "Miền Nam" },
  { id: 6, value: "chaua", label: "Châu á" },
  { id: 7, value: "chauau", label: "Châu âu" },
  { id: 8, value: "chauuc", label: "Châu úc" },
];
export default function NavBarHeader() {
  const router = useRouter();

  function HandlerChange(value: string) {
    const pasthvalue = regions.find((item) => item.id == Number(value));
    console.log("Selected region:", pasthvalue);
    router.push(`/tourdetail/${pasthvalue?.value}`);
  }
  return (
    <div className="flex justify-between items-center gap-[20px] mr-20">
      <span className="text-lg font-medium hover:text-blue-600">
        <Link href={"/"}>Trang Chủ</Link>
      </span>
      <Select onValueChange={HandlerChange}>
        <SelectTrigger className="w-[140px] border-none text-lg ">
          <SelectValue placeholder="Trong nước" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">Miền Bắc</SelectItem>
          <SelectItem value="4">Miền Trung </SelectItem>
          <SelectItem value="5">Miền Nam</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={HandlerChange}>
        <SelectTrigger className="w-[140px] border-none text-lg">
          <SelectValue placeholder="Nước ngoài" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="6">Châu Á</SelectItem>
          <SelectItem value="7">Châu Âu</SelectItem>
          <SelectItem value="8">Châu Úc</SelectItem>
        </SelectContent>
      </Select>
      <a className="text-lg hover:text-blue-600 cursor-pointer">Tin tức</a>
      <a className="text-lg hover:text-blue-600 cursor-pointer">Liên hệ</a>
    </div>
  );
}
