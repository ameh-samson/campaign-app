import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.slice(1);

  const [formData, setFormData] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    linkedKeywords: "",
    digestCampaign: false,
    dailyDigest: "",
    campaignStatus: "",
  });

  useEffect(() => {
    getCampaign();
  }, []);

  const getCampaign = async () => {
    if (id) {
      try {
        const postData = await axios.get(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const campaignData = postData.data;
        campaignData.startDate = formatDate(campaignData.startDate);
        campaignData.endDate = formatDate(campaignData.endDate);
        setFormData(campaignData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const payload = {
      campaignDTO: {
        ...formData,
      },
    };

    console.log("Submitting form with data:", payload);

    try {
      const response = await axios.put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", formData);
      if (response.status === 200 || response.status === 204) {
        toast.success("Campaign information updated successfully.");
        navigate("/campaign");
      } else {
        toast.error("Failed to update campaign information.");
      }
    } catch (error) {
      toast.error("Failed to update campaign information.");
    }
  };

  return (
    <div className="font-sans ml-[6%]">
      <div className="ml-[22%] pt-[10%] px-5 py-10 text-gray-600">
        <Link to="/campaign">
          <p className="flex items-center gap-1 text-gray-800 font-medium mb-4">
            <IoMdArrowBack className="text-xl" />
            Back
          </p>
        </Link>
        <div className="flex justify-between items-center mb-6 w-[42.6rem]">
          <h3 className="text-left text-xl mb-3 text-[#247b7b] font-workSans font-bold">
            Campaign Information
          </h3>
          <p className="bg-gray-100 text-sm px-2 py-1 rounded">
            Campaign Status <span className="text-gray-300">|</span>{" "}
            <span
              className={
                formData.campaignStatus === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {formData.campaignStatus}
            </span>
          </p>
        </div>
        <div>
          <form className="w-[42.6rem]" onSubmit={handleEdit}>
            <div className="mb-5">
              <label className="block text-sm mb-1">Campaign Name</label>
              <input
                type="text"
                required
                name="campaignName"
                value={formData.campaignName}
                onChange={(e) =>
                  setFormData({ ...formData, campaignName: e.target.value })
                }
                className="w-full p-2 border border-gray-400 rounded"
              />
            </div>

            <div className="flex gap-6 mb-5">
              <div className="flex flex-col w-1/2">
                <label className="text-sm mb-1">
                  Start Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm mb-1">Linked Keywords*</label>
              <textarea
                name="linkedKeywords"
                onChange={(e) =>
                  setFormData({ ...formData, linkedKeywords: e.target.value })
                }
                value={formData.linkedKeywords}
                className="w-full p-2 border border-gray-400 rounded min-h-[100px]"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm mb-1">
                Want to receive daily digest about the campaign?
              </label>
              <select
                className="w-full p-2 border border-gray-400 rounded"
                name="digestCampaign"
                value={formData.digestCampaign ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    digestCampaign: e.target.value === "Yes",
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-sm mb-1">
                Kindly select how often you want to receive daily digest
              </label>
              <select
                className="w-full p-2 border border-gray-400 rounded"
                name="dailyDigest"
                value={formData.dailyDigest}
                onChange={(e) =>
                  setFormData({ ...formData, dailyDigest: e.target.value })
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <div className="flex gap-6 mt-6">
              <Link to="">
                <button
                  type="button"
                  className="w-36 py-2 bg-red-800 text-white rounded font-semibold"
                >
                  Stop Campaign
                </button>
              </Link>
              <button
                type="submit"
                className="w-36 py-2 border border-teal-700 text-teal-700 rounded font-semibold"
              >
                Edit Information
              </button>
            </div>
          </form>
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
      />
    </div>
  );
}
