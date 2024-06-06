import './App.css'
import Dashboard from './pages/Dashboard'
import Campaign from './pages/Campaign'
import EditCampaign from './pages/EditCampaign'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewCampaign from './pages/NewCampaign'

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
