import React from "react";
import { isAuthenticated } from "../Auth/index";
import styles from "./UserInfo.module.css"

const UserInfo = () => {
  const { user } = isAuthenticated();
  return (
    <div className={styles.container}>
      <h3>{user.role == 1 ? "Admin" : "User"} Information</h3>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.role == 1 ? "Admin" : "Registered User"}</p>
    </div>
  );
};

export default UserInfo;
