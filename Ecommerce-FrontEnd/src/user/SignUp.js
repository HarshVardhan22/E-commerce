import React, { useState } from "react";
import Layout from "../core/Layout";
import { signUp } from "../Auth/index";
import Home from "../core/Home";
import style from "./SignUp.module.css";
const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "", //if user has typo or something
    success: false,
  });

  const { name, email, password, error, success } = values; //destructuring the object so that its easy to access the data inside

  //handlechange is a higher order function i.e its a function which returns another function
  //changed const handleChange = name => event => {
  const handleChange = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };

  //can also write as : const signUp = (name,email,password)=>{ goto line 41 for more ref

  //*************the code below has been imported to auth/index.js*******************

  // const signUp = (user)=>{

  //   //using fetch to send data to backend

  //   return fetch(`${API}signup`,{
  //       method:'POST',
  //       headers:{
  //         Accept:'application/json',
  //         "Content-Type": 'application/json'
  //       },
  //       body: JSON.stringify(user)
  //   }).then(res => {return res.json();})
  //     .catch(err => {return console.log(err);});

  // };

  const clickSubmit = (event) => {
    event.preventDefault();

    //signUp(name,email,password) but instead of sending 3 different params
    //we can also send them as one object, say "user" with 3 props;
    //As in objects is the name of prop is same as the value i.e apple:apple, them we can write only apple
    //as in this case : signUp({name:name,email:email,password:password}) === |
    //                                                                        V

    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "", //if user has typo or something
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <h1>Sign-Up</h1>
      <div className=" form-group pb-3 pt-3">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className=" form-group pb-3">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className=" form-group pb-3">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger mt-2"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info mt-2"
      style={{ display: success ? "" : "none" }}
    >
      New account created!. Please Sign in.
    </div>
  );

  return (
    <div className={style.container}>

      <div className={style.rightContainer}>
        <Home />
      </div>

      <div className={style.leftContainer}>
        {signUpForm()}
        {showError()}
        {showSuccess()}
      </div>
    </div>
  );
};

export default SignUp;
