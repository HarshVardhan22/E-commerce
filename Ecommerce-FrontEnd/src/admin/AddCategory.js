import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";
import { createCategory } from "./ApiAdmin";
import styles from "./AddCategory.module.css"
import {ImCross} from 'react-icons/im'

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tempName, setTempName] = useState("");
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //make req to API to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setTempName(name);
        setError(true);
      } else {
        setError("");
        setTempName(name);
        setSuccess(true);
        setName("");
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return (<div className={styles.alert}  onClick={()=>{setSuccess(false)}}>
        <p className="text-success">{tempName} is created</p>
        <ImCross style={{marginLeft:"10px",marginBottom:"5px"}} onClick={()=>{setSuccess(false)}}/>
      </div>);
    }
  };

  const showError = () => {
    if (error) {
      return (<div className={styles.alert} onClick={()=>{setError(false)}}>
        <p className="text-danger">{tempName} is already present</p>
        <ImCross style={{marginLeft:"10px",marginBottom:"5px"}} onClick={()=>{setError(false)}}/>
      </div>);
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group  pb-3 pt-3">
        <label className="text-muted" style={{fontWeight:"bold",fontSize:"20px",marginBottom:"10px"}}>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Add</button>
    </form>
  );

  return (
    <Layout
      title="Create Category"
      description={`Hi, ${user.name}! Ready to add a new Category?`}
    >
      <div className={styles.container}>
        <div className="col-md-6 col-sm-9">
         {showSuccess()}
        {showError()}

          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
