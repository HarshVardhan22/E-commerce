import React, { Fragment } from "react"; //https://reactjs.org/docs/fragments.html
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../Auth/index";
import style from "./Menu.module.css";
import { itemTotal } from "./cartHelpers";

//the function isActive is used to determine which tab is clicked by the user ie home, signIn or Signup
//it accepts two arguments history and path where history.location.pathname is browser attribute
//path is the address that has been requested by the user
//if the path and history is same the tab will lit up in orangered color else white

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "orangered" };
  return { color: "#ffffff" };
};
const Menu = ({ history }) => {
  return (
    <ul className={style.container}>
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={isActive(history, "/shop")}>
          Shop
        </Link>
      </li>
      <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

      {!isAuthenticated() && (
        <Fragment>
          {/* it is used to render something without div in react as using the DIV here will change the styling of page*/}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <div>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() =>
                signOut(() => {
                  history.push("/"); //since the function singOut needs a callback argument we will redirect the user to homePage
                  //it performs the same funtion as "redirect function"
                })
              }
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              Sign Out
            </span>
          </li>
        </div>
      )}

      {isAuthenticated() && isAuthenticated().user.role == 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={isActive(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role == 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/admin/dashboard"
            style={isActive(history, "/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Menu);
