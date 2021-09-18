import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Product from './core/Product';
import Home from "./core/Home";
import Shop from "./core/Shop";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Menu from "./core/Menu";
import Cart from "./core/Cart";
import Order from "./core/Order";
import OrderPlaced from "./core/OrderPlaced";
import ComingSoon from "./userComponents/ComingSoon";
const Routes = () =>{
    return(
        
        <BrowserRouter>
        <Menu/>
            <Switch>
                <Route path= "/" exact component = {Home}/>
                <Route path= "/shop" exact component = {Shop}/>
                <Route path= "/signup" exact component = {SignUp}/>
                <Route path= "/signin" exact component = {SignIn}/>
                <Route path="/cart" exact component={Cart} />
                <Route path="/order" exact component={Order} />
                <Route path="/orderPlaced" exact component={OrderPlaced} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/user/dashboard" exact component = {UserDashboard}/>
                <PrivateRoute path="/profile/update" exact component = {ComingSoon}/>
                <AdminRoute path="/admin/dashboard" exact component = {AdminDashboard}/>
                <AdminRoute path="/create/category" exact component = {AddCategory}/>
                <AdminRoute path="/create/product" exact component = {AddProduct}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
