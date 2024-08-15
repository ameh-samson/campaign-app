import React, { useEffect, useState } from 'react'
import Navbar from '@/layout/desktop/sideNavbar/Side-navbar'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { GoEye } from 'react-icons/go'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineSearch } from 'react-icons/md'
import Header from '@/layout/desktop/Header'
import './Campaign.css'
import '@/screens/overview/Overview.css'
import axios from 'axios'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Campaign() {
  // these states helps store and update data
  // stores and updates the campaign list page
  const [campaigns, setCampaigns] = useState([]) 
  // handles the list of campaigns shown per page
  const [currentPage, setCurrentPage] = useState(1)
  // number of campaigns that will show per page
  const itemsPerPage = 10

  // handles the rendering of the campaigns from the backend api
  useEffect(() => {
    getCampaigns()
  }, [])

  // the function that handles the fecting of the campaigns fromthe api
  const getCampaigns = async () => {
    try {
      const postData = await axios.get(
        'https://infinion-test-int-test.azurewebsites.net/api/Campaign',
        {
          // this states the type of data that is being received
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
// this updates the state with the data that was gotten
      setCampaigns(postData.data)
    } catch (err) {
      // sets the campaign page to empty if the fect request fails
      setCampaigns([])
toast.error("Unable to get campaigns, please retry")    }
  }
// this function is incharge of deleting any selected campaign that matches an id
  const deleteCampaign = async (id: number) => {
    // confirm if you want to delete the clicked campaign
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this campaign?',
    )
    if (isConfirmed) {
      try {
        const res = await axios.delete(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (res.status === 204) {
          toast.success('Campaign has been deleted.')
          getCampaigns()
        }
      } catch (err) {
        toast.warning('Unable to delete campaign')}
    }
  }

  // this handles the number of campaigns that will be shown per page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(campaigns.length / itemsPerPage)

  // handles the pagination also
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }


  type campaignType = {
    id: number
    campaignStatus: 'Active' | 'Inactive'
    campaignName: string
    startDate: string
  }
// filters and displays the number of active and inactive campaigns
  const activeCampaignsCount = campaigns.filter(
    (campaign: campaignType) => campaign.campaignStatus === 'Active',
  ).length
  const inactiveCampaignsCount = campaigns.filter(
    (campaign: campaignType) => campaign.campaignStatus !== 'Active',
  ).length

  return (
    <div className="campaign-page">
      <Navbar />
      <Header />

      <div className="campaign-container">
        <h3 className="camp-text">All Campaigns</h3>
        <div className="campaign-table-details">
          <div className="capmaign-status">
            <p className="all-campaign">
              All (<span>{campaigns.length}</span>)
            </p>
            <p className="inactive-campaign">
              Inactive (<span>{inactiveCampaignsCount}</span>)
            </p>
            <p className="active-campaign">
              Active (<span>{activeCampaignsCount}</span>)
            </p>
          </div>
          <div className="search-select-campaign-cont">
            <div className="input-cont campaign-search">
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="search-input campaign-search-input"
              />
              <MdOutlineSearch className="search-icon campaign-seacrh-icon" />
            </div>
            <select className="campaign-select-input input-cont">
              <option value="campaign-filter">Filter by date,</option>
            </select>
          </div>
        </div>
        <div className="campaign-table-container">
          <div className="campaign-table">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Campaign Name</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentCampaigns.map((campaign: campaignType, index) => {
                  return (
                    <tr key={campaign.id}>
                      <td>{indexOfFirstItem + index + 1}.</td>
                      <td>
                        {campaign.campaignName}
                      </td>
                      <td>{campaign.startDate.slice(0, 10)}</td>
                      <td
                        className={
                          campaign.campaignStatus === 'Active'
                            ? 'active'
                            : 'inactive'
                        }
                      >
                        {campaign.campaignStatus.toUpperCase()}
                      </td>
                      <td className="btn-td">
                        <Link
                          to={`/edit-campaign/${campaign.id}?${campaign.id}`}
                        >
                          <button className="eye-btn">
                            <GoEye />
                          </button>
                        </Link>
                        <Link
                          to={`/edit-campaign/${campaign.id}?${campaign.id}`}
                        >
                          <button className="edit-btn">
                            <FiEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteCampaign(campaign.id)}
                          className="delete-btn"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="campaign-number-cont">
            <p className="campaign-number">
              {currentPage > 1 && (
                <span onClick={() => handlePageClick(currentPage - 1)}>
                  <IoIosArrowBack className="arrow-back" />
                </span>
              )}
              {pageNumbers.map((number) => {
                if (
                  number === 1 ||
                  number === totalPages ||
                  (number >= currentPage - 2 && number <= currentPage + 2)
                ) {
                  return (
                    <span
                      key={number}
                      className={`page-number ${
                        currentPage === number ? 'num-two' : ''
                      }`}
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </span>
                  )
                } else if (
                  (number === currentPage - 7 && number > 1) ||
                  (number === currentPage + 7 && number < totalPages)
                ) {
                  return <span key={number}>...</span>
                } else {
                  return null
                }
              })}
              {currentPage < totalPages && (
                <span onClick={() => handlePageClick(currentPage + 1)}>
                  <IoIosArrowForward className="arrow-forward" />
                </span>
              )}
            </p>
            <p className="campaign-bottom-text">
              Showing {currentCampaigns.length} of {campaigns.length} results
            </p>
          </div>
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
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
