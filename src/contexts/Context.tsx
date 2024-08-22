import { childrenPropsType, contextType } from "@/types";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Context = createContext<contextType | undefined>(undefined);

export const ContextProvider = ({ children }: childrenPropsType) => {
  const [campaigns, setCampaigns] = useState([]);

  // the function that handles the fecting of the campaigns fromthe api
  const getCampaigns = async () => {
    try {
      const postData = await axios.get(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign",
        {
          // this states the type of data that is being received
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // this updates the state with the data that was gotten
      setCampaigns(postData.data);
    } catch (err) {
      // sets the campaign page to empty if the fect request fails
      setCampaigns([]);
      toast.error("Unable to get campaigns, please retry");
    }
  };

  // handles the rendering of the campaigns from the backend api
  useEffect(() => {
    getCampaigns();
  }, []);

  // this function is incharge of deleting any selected campaign that matches an id
  const deleteCampaign = async (id: number) => {
    // confirm if you want to delete the clicked campaign
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (isConfirmed) {
      try {
        const res = await axios.delete(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
