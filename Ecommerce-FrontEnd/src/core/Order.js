import React from "react";
// import "./Order.css";
import { useHistory } from "react-router-dom";
import { emptyCart } from "./cartHelpers";
const Order = () => {
  let history = useHistory();
  const handleSubmit = () => {
    emptyCart(() => {
      console.log("Order Placed!");
    });
    history.push("/orderPlaced");
  };
  return (
    <div className="container order">
      <div className="row">
        <div className="col-8 offset-2 col-md-4 offset-md-4 text-center">
          <h2>Delivery Details</h2>
        </div>
      </div>
      <div className="container login">
        <div className="row ">
          <div className="col-8 offset-2 col-md-4 offset-md-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                {" "}
                <h5>Name</h5>
                <input
                  type="text"
                  className="form-control mt-2 mb-2"
                  required={true}
                />
              </div>
              <div className="form-group">
                <h5>Phone Number</h5>
                <input
                  type="number"
                  className="form-control mt-2  mb-2"
                  required={true}
                />
              </div>
              <div className="form-group">
                <h5>Address</h5>
                <input
                  type="text"
                  className="form-control mt-2  mb-2"
                  placeholder="Address Line 1"
                  required={true}
                />
              </div>
              <div className="form-group">
                {" "}
                <input
                  type="text"
                  className="form-control mt-2  mb-2"
                  placeholder="Address Line 2"
                  required={true}
                />
              </div>
              <div className="form-group">
                <h5>Pincode</h5>
                <input
                  type="number"
                  className="form-control mt-2  mb-2"
                  required={true}
                />
              </div>

              {/* <Link to="/orderPlaced">
                <button
                  className="btn btn-success mt-2  mb-2"
                  type="submit"
                >
                  Place Order
                </button>
              </Link> */}
              <button className="btn btn-success mt-2  mb-2" type="submit">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
