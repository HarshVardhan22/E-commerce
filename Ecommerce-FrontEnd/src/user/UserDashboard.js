import React from "react";
import Layout from "../core/Layout";
import UserInfo from "../userComponents/UserInfo";
import { isAuthenticated } from "../Auth/index";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  // const { user } = isAuthenticated();

  // const userLinks = () => {
  //   return (
  //     <div className="card mt-5">
  //       <h4 className="card-header">User Links</h4>
  //       <ul className="list-group">
  //         <li className="list-group-item">
  //           <Link className="nav-link" to="/cart">
  //             Profile
  //           </Link>
  //         </li>
  //         <li className="list-group-item">
  //           <Link className="nav-link" to="/cart">
  //             My Cart
  //           </Link>
           
  //         </li>
  //         <li className="list-group-item">
  //           <Link className="nav-link" to="/profile/update">
  //             Update Profile!
  //           </Link>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  // const userInfo = () => {
  //   return (
  //     <div className="card m-5">
  //       <h3 className="card-header">User Information</h3>
  //       <ul className="list-group">
  //         <li className="list-group-item">{user.name}</li>
  //         <li className="list-group-item">{user.email}</li>
  //         <li className="list-group-item">
  //           {user.role == 1 ? "Admin" : "Registered User"}
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  // const purchaseHistory = () => {
  //   return (
  //     <div className="card m-5">
  //       <h3 className="card-header">Purchase history</h3>
  //       <ul className="list-group">
  //         <li className="list-group-item">ITEM 1</li>
  //       </ul>
  //     </div>
  //   );
  // };

  const { user } = isAuthenticated();
  return (
    <Layout
      title="Dashboard"
      description={`Hi, ${user.name}!`}
      className="container-fluid"
    >
      <div className="row">
    
        <div className="col-md-6 col-sm-9" style={{paddingLeft:"0"}}>
        <UserInfo />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
