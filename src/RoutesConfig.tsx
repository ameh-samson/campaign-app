import Campaign from "@/screens/Campaign";
import EditCampaign from "@/screens/EditCampaign";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NewCampaign from "@/screens/NewCampaign";
import Overview from "@/screens/Overview";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" index element={<Overview />} />
      <Route path="/new" element={<NewCampaign />} />
      <Route path="/campaign" element={<Campaign />} />
      <Route path="/edit-campaign/:id" element={<EditCampaign />} />
    </Routes>
  );
};

export default RoutesConfig;
