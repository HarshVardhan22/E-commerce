import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../Auth/index";
import { Link } from "react-router-dom";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <Link to="/order">
        <button className="btn btn-success">Checkout</button>
      </Link>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <h2>Total: ₹{getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
