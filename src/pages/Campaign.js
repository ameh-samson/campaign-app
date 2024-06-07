import React, { useEffect, useState } from 'react'
import Navbar from './Side-navbar'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { GoEye } from 'react-icons/go'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineSearch } from 'react-icons/md'
import TopNav from './TopNav'
import './Campaign.css'
import './Overview.css'
import axios from 'axios'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    getCampaigns()
  }, [])

  const getCampaigns = async () => {
    try {
      const postData = await axios.get(
        'https://infinion-test-int-test.azurewebsites.net/api/Campaign',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      setCampaigns(postData.data)
    } catch (err) {
      setLoading(false)
      setCampaigns([])
      console.log(err)
    }
  }

  const deleteCampaign = async (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this campaign?',
    )
    if (isConfirmed) {
      setDeleting(true)
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
          setDeleting(false)
          toast.success('Campaign has been deleted.')
          getCampaigns()
        }
      } catch (err) {
        setDeleting(false)
        console.log(err)
      }
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(campaigns.length / itemsPerPage)

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const activeCampaignsCount = campaigns.filter(
    (campaign) => campaign.campaignStatus === 'Active',
  ).length
  const inactiveCampaignsCount = campaigns.filter(
    (campaign) => campaign.campaignStatus !== 'Active',
  ).length

  return (
    <div className="campaign-page">
      <Navbar />
      <TopNav />

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
                {currentCampaigns.map((campaign, index) => {
                  return (
                    <tr key={campaign.id}>
                      <td>{indexOfFirstItem + index + 1}.</td>
                      <td>
                        {campaign.campaignName === ''
                          ? '---'
                          : campaign.campaignName}
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
                  (number === currentPage - 3 && number > 1) ||
                  (number === currentPage + 3 && number < totalPages)
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
