import React from 'react'
import './Side-navBar.css'
import logo from '@/assets/jpg/logo.jpg'
import { NavLink } from 'react-router-dom'
import { IoIosAdd, IoMdHelpCircleOutline } from 'react-icons/io'
import { RiDashboard2Line } from 'react-icons/ri'
import { MdOutlineCampaign, MdOutlineWbIncandescent } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'

export default function SideNavbar() {
  return (
    <nav className="navbar">
      <div className="logo-div">
        <img src={logo} alt="logo" className="logo" />
        <p className="logo-text">
          Sc<span>rutz</span>
        </p>
      </div>
      <div className="nav-list">
        <ul className="navbar-links">
          <li>
            <NavLink to="/new">
              <div className="nav-item add-new">
                <IoIosAdd className="icon" />
                New Campaign
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <div className="nav-item">
                <RiDashboard2Line className="icon" />
                Overview
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/campaign"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <div className="nav-item">
                <MdOutlineCampaign className="icon" />
                Campaign
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <div className="nav-item">
                <MdOutlineWbIncandescent className="icon" />
                Market Intelligence
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <div className="nav-item">
                <IoSettingsOutline className="icon" />
                Account settings
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-help">
        <IoMdHelpCircleOutline className="help-outline" />
        <p className="need-text">
          Need <span className="help-text">help?</span>
        </p>
        <p className="help-body-text">
          We’re readily available to provide help
        </p>
        <button className="help-btn">Get help</button>
      </div>
    </nav>
  )
}
