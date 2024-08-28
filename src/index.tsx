import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "./App";
import { CampaignContextProvider } from "@/contexts/CampaignContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <CampaignContextProvider>
      <App />
    </CampaignContextProvider>
  </React.StrictMode>
);
