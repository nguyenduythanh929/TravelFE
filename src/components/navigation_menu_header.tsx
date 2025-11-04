import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";

export default function NavBarHeader() {
  return (
    <div className="flex justify-between items-center gap-[20px] mr-20">
      <span className="text-lg font-medium hover:text-blue-600">
        <Link href={"/"}>Trang Chủ</Link>
      </span>
      <Select>
        <SelectTrigger className="w-[140px] border-none text-lg ">
          <SelectValue placeholder="Trong nước" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mienbac">Miền Bắc</SelectItem>
          <SelectItem value="mientrung">Miền Trung </SelectItem>
          <SelectItem value="miennam">Miền Nam</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[140px] border-none text-lg">
          <SelectValue placeholder="Nước ngoài" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="chaua">Châu Á</SelectItem>
          <SelectItem value="chauau">Châu Âu</SelectItem>
          <SelectItem value="chaumy">Châu Mỹ</SelectItem>
          <SelectItem value="chauuc">Châu Úc</SelectItem>
        </SelectContent>
      </Select>
      <a className="text-lg hover:text-blue-600 cursor-pointer">Tin tức</a>
      <a className="text-lg hover:text-blue-600 cursor-pointer">Liên hệ</a>
      {/* <NativeSelect>
        <NativeSelectOption value="">Trong nước</NativeSelectOption>
        <NativeSelectOption value="todo">Miền Bắc</NativeSelectOption>
        <NativeSelectOption value="in-progress">Miền Trung</NativeSelectOption>
        <NativeSelectOption value="done">Miền Nam</NativeSelectOption>
      </NativeSelect> */}
    </div>
  );
}
