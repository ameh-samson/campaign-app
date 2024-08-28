import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { campaignType } from "@/types";
import { useCampaignContext } from "@/hooks/useCampaignContext";

export default function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { campaigns, deleteCampaign } = useCampaignContext();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const activeCampaignsCount = campaigns.filter(
    (campaign: campaignType) => campaign.campaignStatus === "Active"
  ).length;
  const inactiveCampaignsCount = campaigns.filter(
    (campaign: campaignType) => campaign.campaignStatus !== "Active"
  ).length;

  return (
    <div className="font-nunito pb-8">
      <div className="ml-[22%] pt-[10%] pl-[5.4rem]">
        <h3 className="text-left text-xl mb-3 text-[#247b7b] font-workSans font-bold">
          All Campaigns
        </h3>
        <div className="flex items-center gap-24">
          <div className="flex gap-4">
            <p className="text-[#247b7b] text-sm font-medium border border-[#2a9d8f] rounded py-[0.375rem] px-[0.625rem]">
              All (<span>{campaigns.length}</span>)
            </p>
            <p className="text-[#247b7b] text-sm font-medium border border-[#2a9d8f] rounded py-[0.375rem] px-[0.625rem]">
              Inactive (<span>{inactiveCampaignsCount}</span>)
            </p>
            <p className="text-[#247b7b] text-sm font-medium border border-[#2a9d8f] rounded py-[0.375rem] px-[0.625rem]">
              Active (<span>{activeCampaignsCount}</span>)
            </p>
          </div>
          <div className="flex items-center gap-7">
            <div className="flex items-center justify-center text-xs text-[#666666] rounded border border-[#999999] px-4 py-2">
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="w-full border-none focus:outline-none focus:ring-0 mb-0"
              />
              <MdOutlineSearch className="text-gray-400" />
            </div>
            <select className="border border-gray-300 w-[14.2rem] h-[1.9rem] rounded focus:outline-none">
              <option value="campaign-filter">Filter by date,</option>
            </select>
          </div>
        </div>
        <div className="mt-[2.3rem]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f0f4f4]">
                <th className="text-left text-xs p-2">S/N</th>
                <th className="text-left text-xs p-2">Campaign Name</th>
                <th className="text-left text-xs p-2">Start Date</th>
                <th className="text-left text-xs p-2">Status</th>
                <th className="text-left text-xs p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCampaigns.map((campaign: campaignType, index: number) => {
                return (
                  <tr key={campaign.id} className="h-12">
                    <td className="text-sm p-2">
                      {indexOfFirstItem + index + 1}.
                    </td>
                    <td className="text-sm p-2">{campaign.campaignName}</td>
                    <td className="text-sm p-2">
                      {campaign.startDate.slice(0, 10)}
                    </td>
                    <td
                      className={`text-sm p-2 ${
                        campaign.campaignStatus === "Active"
                          ? "text-[#009918]"
                          : "text-[#990000]"
                      }`}
                    >
                      {campaign.campaignStatus.toUpperCase()}
                    </td>
                    <td className="flex items-center space-x-2 p-2">
                      <Link to={`/edit-campaign/${campaign.id}?${campaign.id}`}>
                        <button>
                          <GoEye className="text-lg text-gray-600" />
                        </button>
                      </Link>
                      <Link to={`/edit-campaign/${campaign.id}?${campaign.id}`}>
                        <button>
                          <FiEdit className="text-lg text-gray-600" />
                        </button>
                      </Link>
                      <button onClick={() => deleteCampaign(campaign.id)}>
                        <RiDeleteBin6Line className="text-lg text-gray-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between items-center w-[52rem] p-2 mt-6">
            <p className="flex items-center gap-6 font-bold">
              {currentPage > 1 && (
                <span onClick={() => handlePageClick(currentPage - 1)}>
                  <IoIosArrowBack className="cursor-pointer" />
                </span>
              )}
              {pageNumbers.map((number) => {
                if (
                  number === 1 ||
                  number === totalPages ||
                  (number >= currentPage - 2 && number <= currentPage + 2)
                ) {
                  return (
                    <span
                      key={number}
                      className={`cursor-pointer ${
                        currentPage === number
                          ? "bg-[#247b7b] text-white px-2 py-1 rounded-full"
                          : ""
                      }`}
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </span>
                  );
                } else if (
                  (number === currentPage - 7 && number > 1) ||
                  (number === currentPage + 7 && number < totalPages)
                ) {
                  return <span key={number}>...</span>;
                } else {
                  return null;
                }
              })}
              {currentPage < totalPages && (
                <span onClick={() => handlePageClick(currentPage + 1)}>
                  <IoIosArrowForward className="cursor-pointer" />
                </span>
              )}
            </p>
            <p className="text-sm font-bold">
              Showing {currentCampaigns.length} of {campaigns.length} results
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
