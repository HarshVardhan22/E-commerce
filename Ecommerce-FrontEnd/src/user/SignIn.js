import React,{useState} from "react";
import Layout from "../core/Layout";
import {signIn,authenticate,isAuthenticated} from "../Auth/index";
import { Redirect } from "react-router-dom";
import Home from "../core/Home";
import style from "./SignIn.module.css";
const SignIn =()=> {

  const {user} = isAuthenticated()

  const [values, setValues] = useState({
    email: "hsinha31@gmail.com",
    password: "harsh1234",
    error: "", //if user has typo or something
    loading: false,
    redirectToReferrer: false
  });

  const {email,password,error,loading,redirectToReferrer} = values; //destructuring the object so that its easy to access the data inside

  //handlechange is a higher order function i.e its a function which returns another function
  //changed const handleChange = name => event => {
  const handleChange = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };


  const clickSubmit = (event) => {

    event.preventDefault();

    setValues({...values,error:false,loading:true})                                                              

    signIn({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //this authenticate function is used to store data into the local server, for more info goto auth->index.js
        //since the authenticate function had two arguments the first being data, we transfered the next() as a callback to set value
        // of redirectToReferrer true which will lead the user to home page after the signIn is completed successfully
        authenticate(data,()=>{
          setValues({
            ...values,
            redirectToReferrer:true
          });
        })
      }
    });
  }


 
  const signInForm = () => 
    (
      <form>
      <h1>Sign-In</h1>
        <div className=" form-group pb-3 pt-3">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value = {email}
          />
        </div>

        <div className=" form-group pb-3">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value = {password}
          />
        </div>
        <button onClick = {clickSubmit} className="btn btn-primary">Submit</button>
      </form>
    );
    
    const showError = () =>
      (<div className="alert alert-danger" style={{display:error?'':'none'}}>
        {error}
      </div>);
    
    const showLoading = () =>
      loading&&(<div className="alert alert-info">
        <h2>Loading...</h2>
      </div>);
    
    const redirectUser=()=>{
      if(redirectToReferrer){
        if(user && user.role===1)
          return <Redirect to="/admin/dashboard"/>
        else if(user && user.role===0)
          return <Redirect to="/user/dashboard"/>
      }
      if(isAuthenticated())
        return <Redirect to="/"/>   
  }

  return (
    <div className={style.container}>

    <div className={style.rightContainer}>
      <Home />
    </div>

    <div className={style.leftContainer}>
    {showError()}
        {showLoading()}
        {signInForm()}
        {redirectUser()}
    </div>
  </div>
   
  );
}

export default SignIn;
