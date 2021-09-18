import React from "react";
import Layout from "../core/Layout";
import styles from "./ComingSoon.module.css";
import { isAuthenticated } from "../Auth";
const ComingSoon = () => {
  const { user} = isAuthenticated();
  return (
    <Layout
      title="Update Profile"
      description={`Hi, ${user.name}! Change your details`}
    >
     <div className={styles.container}>
      
      <p>Feature Coming Soon!</p>
    </div>
    </Layout>
    
  );
};

export default ComingSoon;
