import { ReactNode } from "react";

export interface campaignType {
  id: number;
  campaignStatus: "Active" | "Inactive";
  campaignName: string;
  startDate: string;
}

export interface childrenPropsType {
  children: ReactNode;
}

export interface contextType {
  campaigns: campaignType[];
  getCampaigns: () => void;
  deleteCampaign: (id: number) => void;
}
