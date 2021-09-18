import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderPlaced.module.css"

const OrderPlaced = () => {
  return (
    <div className={styles.container}>
  <div className={styles.child}>
      <h1>Order Placed</h1>
      <Link to="/">
        <button className="btn btn-primary">Go to Home</button>
      </Link>
    </div>
    </div>
    
  );
};

export default OrderPlaced;
