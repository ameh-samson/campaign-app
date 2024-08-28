import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from "@/assets/svg/profile.svg";

export default function Header() {
  return (
    <div className="fixed z-40 pr-14 pb-0 pl-[5.4rem] ml-[22%] mb-8 bg-white border-b-2 border-[#f0f4f4] w-[calc(100%-22%)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between text-xs text-[#666666] rounded border border-[#999999] w-[24rem] my-6 px-4 py-2">
          <input
            type="search"
            name="search"
            placeholder="Search for anything..."
            className="w-full border-none focus:outline-none focus:ring-0 mb-0"
          />
          <MdOutlineSearch className="text-2xl" />
        </div>
        <div className="flex items-center justify-center text-[#333333]">
          <IoMdNotificationsOutline className="text-2xl mr-6" />
          <img src={profile} alt="profile" className="h-9 w-9 mr-3" />
          <select className="text-[#333333] border-none px-2">
            <option value="option1">BigTech</option>
          </select>
        </div>
      </div>
    </div>
  );
}
