// import React from 'react'
import Image from "next/image";
// import { Image } from "lucide-react";

export default function InforHeader() {
  return (
    <div className="flex justify-center pt-[10px] pb-[10px]   bg-blue-700 p">
      <div className=" flex items-center justify-end xl:w-[1280px] gap-4">
        <span className="flex gap-1">
          <Image src="/phone.svg" alt="phone" width={25} height={25} />
          <p className="text-white font-medium">0123.456.789</p>
        </span>
        <span className="flex gap-1">
          <Image src="/email.svg" alt="phone" width={25} height={25} />
          <p className="text-white font-medium">contact@KMAtravel.com</p>
        </span>
        <span className="flex gap-1">
          <Image src="/build.svg" alt="phone" width={25} height={25} />
          <p className="text-white font-medium">
            Số 141, đường Chiến Thắng, quận Hà Đông
          </p>
        </span>
      </div>
    </div>
  );
}
