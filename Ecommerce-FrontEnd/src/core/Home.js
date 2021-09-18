import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { getProducts } from "./apiCore";
import Card from "./Card";
const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) setError(data.error);
      else setProductsBySell(data);
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) setError(data.error);
      else setProductsByArrival(data);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <div className={styles.container}>
    <div className={styles.header}>
    <h1 className={`${styles.jumbo} ${styles.jumbo_text_animated}`}>Home Page</h1>
    </div>
      
     
    
      
      <div className="row">
      <h2 className="m-4">Best Sellers</h2>
        {productsBySell.map((product, index) => {
          return <Card key={index} product={product}></Card>;
        })}
      </div>

      
      <div className="row">
      <h2 className="mb-4">New Arrivals</h2>
        {productsByArrival.map((product, index) => {
          return <Card key={index} product={product}></Card>;
        })}
      </div>
    </div>
  );
};

export default Home;
