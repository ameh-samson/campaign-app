import { useContext } from "react";
import { Context } from "@/contexts/Context";

export const useCampaignContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCampaignContext must be used within a ContextProvider");
  }
  return context;
};
