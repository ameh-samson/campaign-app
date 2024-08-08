import React from 'react'
import './App.css'
import Dashboard from './screens/Dashboard'
import Campaign from './screens/Campaign'
import EditCampaign from './screens/EditCampaign'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewCampaign from './screens/NewCampaign'

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewCampaign />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
