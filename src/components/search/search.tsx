"use client";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
export default function Search() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  function showCalendar() {
    const calendar = document.querySelector(".calendar");
    calendar?.classList.remove("hidden");
  }
  return (
    <div className="p-[50px] bg-black/30 rounded-lg mt-[80px] flex flex-col gap-6">
      <InputGroup className="bg-white w-[800px] h-[60px]">
        <InputGroupInput className="h-[50px]" placeholder="Bạn muốn đi đâu?" />
        <InputGroupAddon className="h-[30px] w-[30px]">
          <Image
            src={"/icon-address.svg"}
            alt="icon-adress"
            width={20}
            height={20}
          />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex gap-4">
        <InputGroup className="bg-white w-[300px] h-[60px] ">
          <InputGroupInput placeholder="Số lượng" />
          <InputGroupAddon>
            <Image
              src={"/icon-user.svg"}
              alt="icon-adress"
              width={20}
              height={20}
            />
          </InputGroupAddon>
        </InputGroup>
        <div
          className="bg-white w-[300px] h-[60px] rounded-md flex items-center relative "
          onClick={showCalendar}
        >
          <Image
            src={"/icon-calendar.svg"}
            alt="icon-adress"
            width={20}
            height={20}
            className="ml-4"
          />
          <span className=" ml-4 text-xl text-[#4502c7] font-medium">
            {date?.toLocaleDateString()}
          </span>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm absolute top-[70px] z-10 rounded-md hidden calendar"
            captionLayout="dropdown"
          />
        </div>
        <button className="p-4 pl-6 pr-6  bg-[#4502c7] cursor-pointer text-white text-lg rounded-lg flex items-center gap-2">
          <SearchIcon />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
