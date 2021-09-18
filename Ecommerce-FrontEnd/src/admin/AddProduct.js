import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../Auth";
// import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./ApiAdmin";
import styles from "./AddProduct.module.css";
import {ImCross} from 'react-icons/im'
const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    //we will fetch the categories from BE, meanwhile will use single catg
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price, 
    //we will fetch the categories from BE, meanwhile will use single catg
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,   
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    //we do the below line bcz
    //1. we are using a common high order function to update all the field value of the STATE values
    //2. to get the values form input type file we need the event.target.files
    //3.therefore to diff bet thw commands we used a ternary opreator

    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({
          ...values,
          createdProduct:name,
          name: "",
          description: "",
          price: "",
          quantity: "",
          photo: "",
          // shipping:"",
          // category:"",
          loading: false,
          
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <form className="form col-md-6 col-sm-9 pb-5 pt-5" onSubmit={submitForm}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image/*"       
            onChange={handleChange("photo")} 
            required
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={handleChange("description")}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
            required
          />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <select
            className="form-control"
            value={shipping}
            onChange={handleChange("shipping")}
            required
          >
            <option value="">--select--</option>
            <option value="0">No</option>
            <option value="1">Yes </option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            onChange={handleChange("category")}
            required
          >
            {/* we can fetch the catg from backend here */}
            <option>Please Select</option>
            {categories &&
              categories.map((cat, index) => (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
          required
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showSuccess = () => {
    if (createdProduct) {
      return (
        <div
          className={styles.alert}
          onClick={() => {
            setValues({...values,createdProduct:""});
          }}
        >
          <p className="text-success">{`${createdProduct}`} is created</p>
          <ImCross
            style={{ marginLeft: "10px", marginBottom: "5px" }}
            onClick={() => {
              setValues({...values,createdProduct:""});
            }}
          />
        </div>
      );
    }
  };

  const showLoading = ()=>{
    if(loading){
      return(
        <h1>Loading...</h1>
      )
    }
  }

  const showError = () => {
    if (error) {
      return (
        <div
          className={styles.alert}
          onClick={() => {
            setValues({...values,error:""});
          }}
        >
          <p className="text-danger">{error}</p>
          <ImCross
            style={{ marginLeft: "10px", marginBottom: "5px" }}
            onClick={() => {
              setValues({...values,error:""});
            }}
          />
        </div>
      );
    }
  };

  return (
    <Layout
      title="Add Product"
      description={`Hi, ${user.name}! Ready to add a new Product?`}
    >
      <div className={styles.container}>
      {showLoading()}
      {showError()}
      {showSuccess()}
      {newPostForm()}</div>
    </Layout>
  );
};

export default AddProduct;
