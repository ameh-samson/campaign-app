import React from 'react'
import profile from '../images/profile.jpg'
import './Overview.css'
import './Side-navBar.css'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { MdOutlineSearch } from 'react-icons/md'
import { IoMdNotificationsOutline, IoIosAdd } from 'react-icons/io'
import { RiCalendar2Line, RiArrowDropDownLine } from 'react-icons/ri'
import { CiExport } from 'react-icons/ci'
import searchEmpty from '../search.json'

export default function Overview() {
  return (
    <div className=" body-container">
      <div className="top-navbar-container">
        <div className="input-cont">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="search-input"
          />
          <MdOutlineSearch className="search-icon" />
        </div>
        <div className="profile-div">
          <IoMdNotificationsOutline className="notif-icon" />
          <img src={profile} alt="profile" className="profile-pic" />
          <select className="select-input">
            <option value="option1" className="big-tech">
              BigTech{' '}
            </option>
          </select>
        </div>
      </div>
      <div className="overview-container">
        <h2 className="overview-text">Overview</h2>

        <div className="date-export-cont">
          <div className="date-container">
            <RiCalendar2Line className="calender" />
            <p className="date-text">Date Range</p>
            <select className="date select-input">
              <option value="option1" className="dropdown">
                Nov 1, 2022 - Nov 7, 2022.{' '}
              </option>
            </select>
          </div>

          <div className="export-div">
            <CiExport className="export-icon" />
            <p className="export-text">Export</p>
          </div>
        </div>
      </div>
      <div>
        <div className="lottie-container">
          <Lottie animationData={searchEmpty} loop={false} width={100} />
        </div>
        <p className="activity-text">No activity yet. Create anew campaign to get started</p>
        <Link to="/new">
          <div className="nav-item add-new body-add-new">
            <IoIosAdd className="icon" />
            New Campaign
          </div>
        </Link>
      </div>
    </div>
  )
}
