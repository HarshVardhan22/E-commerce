import React from 'react'
import { isAuthenticated } from "../Auth/index";
import { Link } from "react-router-dom";
import styles from "./UserLinks.module.css"
const UserLinks = () => {
    return (
        <div className={styles.container}>
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">
              Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
              Update Profile!
            </Link>
          </li>
        </ul>
      </div>
    )
}

export default UserLinks
