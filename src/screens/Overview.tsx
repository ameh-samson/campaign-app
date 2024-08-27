import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { RiCalendar2Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import searchEmpty from "@/search.json";

export default function Overview() {
  return (
    <div className="text-center ml-[22%] pt-[10%] pl-[5.4rem]">
      <div className="flex items-center justify-between">
        <h2 className="text-left text-xl mb-6 text-[#247b7b] font-workSans font-bold">
          Overview
        </h2>
        <div className="flex items-center justify-center gap-2 text-xs">
          <div className="flex items-center border border-[#ececec] p-2 rounded">
            <RiCalendar2Line className="text-[#247b7b] text-2xl font-bold" />
            <p className="mx-1 px-1 py-2 border-r border-[#ececec]">
              Date Range
            </p>
            <select className="text-[#666666] border-none">
              <option value="option1" className="text-[#247b7b] text-2xl">
                Nov 1, 2022 - Nov 7, 2022.
              </option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-[#f0f4f4] text-base font-bold text-[#247b7b] px-8">
            <CiExport className="text-2xl font-bold" />
            <p>Export</p>
          </div>
        </div>
      </div>
      <div className="mt-[7.4rem] mx-auto mb-[2.8rem] w-[26.6rem] h-[18.1rem]">
        <Lottie animationData={searchEmpty} loop={false} width={100} />
      </div>
      <p className="text-sm mt-11">
        No activity yet. Create a new campaign to get started
      </p>
      <Link
        to="/new"
        className="flex items-center justify-center mt-9 mb-10 rounded"
      >
        <div className="flex items-center gap-2.5 mr-10 py-2.5 px-5  bg-[#247b7b] text-white text-sm rounded">
          <IoIosAdd className="text-lg" />
          New Campaign
        </div>
      </Link>
    </div>
  );
}
