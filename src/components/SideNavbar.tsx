import logo from "@/assets/svg/logo.svg";
import { NavLink } from "react-router-dom";
import { IoIosAdd, IoMdHelpCircleOutline } from "react-icons/io";
import { RiDashboard2Line } from "react-icons/ri";
import { MdOutlineCampaign, MdOutlineWbIncandescent } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function SideNavbar() {
  return (
    <nav className="w-[22%] h-screen bg-[#f0f4f4] fixed p-8">
      <div>
        <img src={logo} alt="logo" className="w-[167px]" />
        <div className="mt-7">
          <ul>
            <li>
              <NavLink
                to="/new"
                className="no-underline pt-2 text-[#455454] text-justify flex items-center"
              >
                <div className="flex items-center gap-2.5 mr-10 p-2.5 rounded w-[12.25rem] bg-[#247b7b] text-white text-sm mb-10 justify-center">
                  <IoIosAdd className="h-5 w-5" />
                  New Campaign
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white" : ""
                  } no-underline pt-2 text-[#455454] text-justify flex items-center rounded`
                }
              >
                <div className="flex items-center gap-2.5 mr-10 p-2.5">
                  <RiDashboard2Line className="h-5 w-5" />
                  Overview
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/campaign"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white" : ""
                  } no-underline pt-2 text-[#455454] text-justify flex items-center rounded`
                }
              >
                <div className="flex items-center gap-2.5 mr-10 p-2.5">
                  <MdOutlineCampaign className="h-5 w-5" />
                  Campaign
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="no-underline pt-2 text-[#455454] text-justify flex items-center"
              >
                <div className="flex items-center gap-2.5 mr-10 p-2.5">
                  <MdOutlineWbIncandescent className="h-5 w-5" />
                  Market Intelligence
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="no-underline pt-2 text-[#455454] text-justify flex items-center"
              >
                <div className="flex items-center gap-2.5 mr-10 p-2.5">
                  <IoSettingsOutline className="h-5 w-5" />
                  Account settings
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white p-7 mt-7 flex flex-col items-center justify-center text-center">
        <IoMdHelpCircleOutline className="text-2xl text-[#247b7b]" />
        <p className="text-sm text-[#247b7b] font-bold">
          Need <span className="text-[#3b247b]">help?</span>
        </p>
        <p className="text-xs text-[#666666] my-4">
          We’re readily available to provide help
        </p>
        <button className="text-[#247b7b] rounded border border-[#247b7b] bg-transparent py-[0.5px] px-3">
          Get help
        </button>
      </div>
    </nav>
  );
}
