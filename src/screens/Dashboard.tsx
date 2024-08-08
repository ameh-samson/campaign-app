import React from 'react'
import Navbar from './Side-navbar'
import Overview from './Overview'
import Campaign from './Campaign'
import NewCampaign from './NewCampaign'
import EditCampaign from './EditCampaign'

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Overview />
      {/* <Campaign />
      <NewCampaign />
      <EditCampaign /> */}
    </>
  )
}
