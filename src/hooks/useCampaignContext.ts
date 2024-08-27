import { useContext } from "react";
import { CampaignContext } from "@/contexts/CampaignContext";

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaignContext must be used within a ContextProvider");
  }
  return context;
};
