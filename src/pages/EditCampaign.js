import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditCampaign.css';
import './NewCampaign.css';
import Navbar from './Side-navbar';
import TopNav from './TopNav';

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.slice(1);

  const [formData, setFormData] = useState({
    campaignName: '',
    campaignDescription: '',
    startDate: '',
    endDate: '',
    linkedKeywords: '',
    digestCampaign: false,
    dailyDigest: '',
    campaignStatus: ''
  });

  useEffect(() => {
    getCampaign();
  }, []);

  const getCampaign = async () => {
    if (id) {
      try {
        const postData = await axios.get(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const campaignData = postData.data;
        campaignData.startDate = formatDate(campaignData.startDate);
        campaignData.endDate = formatDate(campaignData.endDate);
        setFormData(campaignData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const payload = {
      campaignDTO: {
        ...formData,
      },
    };

    console.log('Submitting form with data:', payload);

    try {
      const response = await axios.put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', formData);
      if (response.status === 200 || response.status === 204) {
        toast.success('Campaign information updated successfully.');
        navigate('/campaign');
      } else {
        toast.error('Failed to update campaign information.');
      }
    } catch (error) {
      toast.error('Failed to update campaign information.');
    }
  };

  return (
    <div>
      <Navbar />
      <TopNav />
      <div className="edit-campaign-cont">
        <Link to="/campaign">
          <p className="back">
            <IoMdArrowBack className="arrow-back" />
            Back
          </p>
        </Link>
        <div className="status-cont">
          <h3>Campaign Information</h3>
          <p>
            Campaign Status <span className="demac">|</span>{' '}
            <span className={formData.campaignStatus === 'Active' ? 'active' : 'inactive'}>
              {formData.campaignStatus}
            </span>
          </p>
        </div>
        <div className="edit-campaign-form">
          <form onSubmit={handleEdit}>
            <div className="name edit-name">
              <label>Campaign Name</label>
              <input
                type="text"
                required
                name="campaignName"
                value={formData.campaignName}
                onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
              />
            </div>

            <div className="date-container">
              <div className="start-date-cont">
                <label className="edit-start-date">
                  Start Date<span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="edit-start-date-input"
                />
              </div>
              <div className="edit-end-date-cont">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="edit-end-date-input"
                />
              </div>
            </div>
            <div>
              <label>Linked Keywords*</label>
              <textarea
                name="linkedKeywords"
                onChange={(e) => setFormData({ ...formData, linkedKeywords: e.target.value })}
                value={formData.linkedKeywords}
              />
            </div>
            <div>
              <label>Want to receive daily digest about the campaign?</label>
              <select
                className="addnew-select-input edit-daily digest"
                name="digestCampaign"
                value={formData.digestCampaign ? 'Yes' : 'No'}
                onChange={(e) => setFormData({ ...formData, digestCampaign: e.target.value === 'Yes' })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label>Kindly select how often you want to receive daily digest</label>
              <select
                className="addnew-select-input edit-daily"
                name="dailyDigest"
                value={formData.dailyDigest}
                onChange={(e) => setFormData({ ...formData, dailyDigest: e.target.value })}
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <div className="edit-campaign-btns">
              <Link to="">
                <button className="stop-btn">Stop Campaign</button>
              </Link>
              <button type="submit" className="edit-page-btn">Edit Information</button>
            </div>
          </form>
        </div>
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
        pauseOnHover/>
    </div>
  );
}
