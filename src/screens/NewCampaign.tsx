import { useRef, useState, useEffect } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Successful from "@/components/Successful";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "@/configurations/AxiosConfig";

export default function NewCampaign() {
  const [isToggle, setIsToggle] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    keywords: "",
    digestCampaign: false,
    dailyDigest: "",
  });

  const { name, description, startDate, endDate, keywords, digestCampaign } =
    formData;

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const postCampaign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name || !description || !startDate || !endDate || !keywords) {
      toast.warn("Please fill the form.");
      return;
    }
    try {
      await axiosInstance.post("/campaign", {
        campaignName: name,
        campaignDescription: description,
        LinkedKeywords: [keywords],
        dailyDigest: "weekly",
        startDate: startDate,
        endDate: endDate,
        digestCampaign: digestCampaign,
      });

      setIsSuccessful(true);
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        keywords: "",
        digestCampaign: false,
        dailyDigest: "",
      });
    } catch (err) {
      toast.error("Failed to update campaign information.");
    }
  };

  // Ref for the successful pop-up
  const successfulPopupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle click outside pop-up box function
  const handleClickOutside = (e: MouseEvent) => {
    if (
      successfulPopupRef.current &&
      !successfulPopupRef.current.contains(e.target as Node)
    ) {
      setIsSuccessful(false);
    }
  };

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsToggle(!isToggle);
  };

  return (
    <div className="ml-[22%]">
      <div className="font-sans text-gray-600 text-sm q py-[10%] pl-[5.3rem]">
        <h3 className="font-bold text-xl text-[#247b7b] text-left">
          Create New Campaign
        </h3>
        <div className="mt-4">
          <form className="w-[42.6rem]">
            <div className="flex flex-col text-left mb-4">
              <label className="mb-1">
                Campaign Name
                <span className="text-red-600 text-xs font-bold">*</span>
              </label>
              <input
                name="name"
                value={name}
                onChange={handleInputChange}
                type="text"
                placeholder="e.g. The Future is now"
                required
                className="p-2 border border-gray-400 rounded mb-4"
              />
            </div>

            <div className="flex flex-col text-left mb-4">
              <label className="mb-1">
                Campaign Description
                <span className="text-red-600 text-xs font-bold">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Please add a description to your campaign"
                required
                className="p-4 border border-gray-400 rounded resize-none h-[6rem] mb-4"
              />
            </div>

            <div className="flex flex-col text-left mb-4">
              <label className="mb-1">
                Start Date
                <span className="text-red-600 text-xs font-bold">*</span>
              </label>
              <input
                name="startDate"
                type="date"
                onChange={handleInputChange}
                value={startDate}
                className="p-2 border border-gray-400 rounded w-full mb-4"
              />
            </div>

            <div className="flex flex-col text-left mb-4">
              <label className="mb-1">End Date</label>
              <input
                name="endDate"
                type="date"
                onChange={handleInputChange}
                value={endDate}
                className="p-2 border border-gray-400 rounded w-full mb-4"
              />
            </div>

            <div className="flex items-center justify-between font-bold mb-6">
              <label>Want to receive daily digest about the campaign?</label>
              <button onClick={handleToggle} className="cursor-pointer">
                {isToggle ? (
                  <BsToggleOn className="text-4xl text-[#6e0080]" />
                ) : (
                  <BsToggleOff className="text-4xl text-gray-300" />
                )}
              </button>
            </div>

            <div className="flex flex-col text-left mb-4">
              <label className="mb-1">
                Linked Keywords
                <span className="text-red-600 text-xs font-bold">*</span>
              </label>
              <textarea
                name="keywords"
                placeholder="To add keywords, type your keyword and press enter"
                onChange={handleInputChange}
                value={keywords}
                className="p-4 border border-gray-400 rounded resize-none mb-4"
              />
            </div>

            <div className="flex flex-col text-left mb-6">
              <label className="mb-1">
                Kindly select how often you want to receive daily digest
              </label>
              <select className="p-2 border border-gray-400 rounded text-gray-500">
                <option value="option1">Select</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-start mt-8 gap-6">
          <Link
            className="p-2 w-56 border border-[#247b7b] rounded text-center text-[#247b7b]"
            to="/"
          >
            Cancel
          </Link>
          <button
            className="p-2 w-56 bg-[#247b7b] text-white rounded"
            onClick={postCampaign}
          >
            Create Campaign
          </button>
        </div>

        {isSuccessful && (
          <div ref={successfulPopupRef}>
            <Successful />
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
