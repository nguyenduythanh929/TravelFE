// import { ModeToggle } from "@/components/toggle-theme";
import NavBarHeader from "@/components/navigation_menu_header";
import Image from "next/image";
import Link from "next/link";

export default function Headers() {
  return (
    <div className="flex justify-center pt-[20px] pb-[20px] bg-white shadow-md">
      {/* Sửa: Loại bỏ justify-between để kiểm soát khoảng cách bằng gap */}
      <div className="flex items-center xl:w-[1280px]">
        {/* 1. Logo */}
        <div className="mr-30">
          {" "}
          {/* Thêm margin phải để tạo khoảng cách với Nav */}
          <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
        </div>

        {/* 2. Navigation Menu - Đặt sát logo */}
        <div>
          <NavBarHeader />
        </div>

        {/* 3. Login/Sign in Buttons - Dùng ml-auto để đẩy ra xa nhất bên phải */}
        <div className="flex gap-2 ml-auto items-center mr-4">
          <button className="p-2 pl-6 pr-6 bg-[#00a8ef] hover:bg-blue-500 text-white text-lg rounded-lg ">
            <Link href="/login">Login</Link>
          </button>

          <button className="p-2 pl-4 pr-4 bg-[#00a8ef] hover:bg-blue-500 text-white text-lg rounded-lg">
            <Link href="/register">Sign in</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
