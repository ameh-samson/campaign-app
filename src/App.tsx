import React from 'react'
import './App.css'
import Campaign from '@/screens/campaign/Campaign'
import EditCampaign from '@/screens/editCampaign/EditCampaign'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewCampaign from '@/screens/newCampaign/NewCampaign'
import { GrandLayout } from './layout/GrandLayout'
import Overview from './screens/overview/Overview'

function App() {
  return (
    <div className="App">
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
        theme="light"
      />
      <Router>
        <Routes>
          <Route element={<GrandLayout/>}>
          <Route path="/" index element={<Overview />} />
          <Route path="/new" element={<NewCampaign />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
