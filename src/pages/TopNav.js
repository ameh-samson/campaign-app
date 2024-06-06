import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import profile from '../images/profilepic.jpg'

export default function TopNav() {
  return (
    <div className="top-navbar-container top">
      <input
        type="search"
        name="search"
        placeholder="Search for anything..."
        className="search-input input-cont top-search"
      />
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
  )
}
