import React from "react";
import styles from "./AdminLinks.module.css";
import { Link } from "react-router-dom";
const AdminLinks = () => {
  return (
    <div className={styles.container}>
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
       
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Add Product
          </Link>
        </li>
       
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/dashboard">
            Account Info
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminLinks;
