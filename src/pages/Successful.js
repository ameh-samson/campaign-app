import React from 'react'
import {Link} from "react-router-dom"
import "./Successful.css"
import { FaCheckCircle } from 'react-icons/fa'

export default function Successful() {
  return (
    <div className="checked-div">
      <FaCheckCircle className="checked" />
      <p className="checked-text">Campaign Successfully Created!</p>
     <Link to="/campaign"> <button className="checked-btn">Go Back to campaign list</button>
     </Link>
    </div>
  )
}
