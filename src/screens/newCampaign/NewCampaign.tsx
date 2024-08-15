import React, { useRef, useState, useEffect } from 'react'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import TopNav from '../../layout/desktop/Header'
import Navbar from '../../layout/desktop/sideNavbar/Side-navbar'
import Successful from '../../components/successful/Successful'
import './NewCampaign.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function NewCampaign() {

  const [isToggle, setIsToggle] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    keywords: '',
    digestCampaign: false,
    dailyDigest: '',
  })

  const {
    name,
    description,
    startDate,
    endDate,
    keywords,
    digestCampaign,
  } = formData

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

  }

  const postCampaign = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!name || !description || !startDate || !endDate || !keywords) {
      toast.warn('Please fill the form.')
      return
    }
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    // }))
    try {
      const postData = await axios.post(
        'https://infinion-test-int-test.azurewebsites.net/api/campaign',
        {
          campaignName: name,
          campaignDescription: description,
          LinkedKeywords: [keywords],
          dailyDigest: 'weekly',
          startDate: startDate,
          endDate: endDate,
          digestCampaign: digestCampaign,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      setIsSuccessful(true)
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        keywords: '',
        digestCampaign: false,
        dailyDigest: '',
      })

    } catch (err) {
      toast.error('Failed to update campaign information.');
    }
  }


  // Ref for the successful pop up
  const successfulPopupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Handle click outside pop up box function
  const handleClickOutside = (e: { target: any }) => {
    if (
      successfulPopupRef.current?.contains(e.target as Node) === false
    ) {
      setIsSuccessful(false);
    }
  }

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsToggle(!isToggle)
  }

  return (
    <div>
      <Navbar />
      <TopNav />
      <div className="new-campaign-cont">
        <h3 className="create-text">Create New Campaign</h3>
        <div className="new-campaign-form">
          <form>
            <div className="name">
              <label>
                Campaign Name<span className="required">*</span>
              </label>
              <input
                name="name"
                value={name}
                onChange={handleInputChange}
                type="text"
                placeholder="e.g  The Future is now"
                required
              />
            </div>

            <div className="desc">
              <label>
                Campaign Description<span className="required">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Please add a description to your campaign"
                required
              />
            </div>
            <div className="start-date-cont">
              <label className="start-date">
                Start Date<span className="required">*</span>
              </label>
              <input
                name="startDate"
                type="date"
                onChange={handleInputChange}
                value={startDate}
              />
            </div>
            <div className="end-date-cont">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                onChange={handleInputChange}
                value={endDate}
              />
            </div>
            <div className='toggle-cont'>
              <label>Want to receive daily digest about the campaign?</label>
              <button onClick={handleToggle}>
                {isToggle ? <BsToggleOn className='toggle-on'/> : <BsToggleOff className='toggle-off'/>}
              </button>
              
            </div>
            <div>
              <label>Linked Keywords*</label>
              <textarea
                name="keywords"
                placeholder="To add keywords, type your keyword and press enter"
                onChange={handleInputChange}
                value={keywords}
              />
            </div>

            <div>
              <label>
                Kindly select how often you want to receive daily digest
              </label>
              <select className="select-input">
                <option value="option1">Select </option>
              </select>
            </div>
          </form>
        </div>
        <div className="new-campaign-btns">
          <Link className="cancel-btn" to="/">
            Cancel
          </Link>
          <button className="create-btn" onClick={postCampaign}>
            Create Campaign
          </button>
        </div>
        {isSuccessful && (
          <div ref={successfulPopupRef}>
            <Successful />
          </div>
        )}{' '}
      </div>
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
    </div>
  )
}
