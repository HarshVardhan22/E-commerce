import React, { useState, useEffect } from "react";
import {  Redirect } from "react-router-dom";
import { API } from "../Config";
// import Layout from "./Layout";
import { read } from "./apiCore";
// import Card from "./Card";
import styles from "./Product.module.css";
import { addItem } from "./cartHelpers";
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [redirect, setRedirect] = useState(false);
  // const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        // listRelated(data._id).then(data => {
        //     if (data.error) {
        //         setError(data.error);
        //     } else {
        //         setRelatedProduct(data);
        //     }
        // });
      }
    });
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    // <div

    //     className="container-fluid"
    // >
    //     <div className="row">
    //         <div className="col-8">
    //             {product && product.description && <Card product={product} styleClass="col-12" showViewProductButton={false} />}
    //         </div>

    //     </div>

    // </div>
    <div className={styles.container}>
      <div className={styles.productInfo}>
        <div className={styles.imgSection}>
        {shouldRedirect(redirect)}
          {" "}
          <img
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.details}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: "22px" }}>{product.description}</p>
          <h3>Price: ₹{product.price}</h3>
          <button
          onClick={addToCart}
          className="btn btn-outline-warning text-dark mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
