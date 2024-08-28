import { campaignType, childrenPropsType, contextType } from "@/types";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/configurations/AxiosConfig";

export const CampaignContext = createContext<contextType | undefined>(
  undefined
);

export const CampaignContextProvider = ({ children }: childrenPropsType) => {
  const [campaigns, setCampaigns] = useState<campaignType[]>([]);

  const getCampaigns = async () => {
    try {
      const postData = await axiosInstance.get("/Campaign");
      setCampaigns(postData.data);
    } catch (err) {
      setCampaigns([]);
      toast.error("Unable to get campaigns, please retry");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const deleteCampaign = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/Campaign/${id}`);
        if (res.status === 204) {
          toast.success("Campaign has been deleted.");
          getCampaigns();
        }
      } catch (err) {
        toast.warning("Unable to delete campaign");
      }
    }
  };

  const value = { campaigns, getCampaigns, deleteCampaign };
  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};
