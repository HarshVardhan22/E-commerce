import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

//the link below explains the concept used behin this code in which we render a component based on a condition
//https://reactrouter.com/web/example/auth-workflow
const PrivateRoute = ({component:Component,...rest}) =>(
    <Route {...rest} render = { props => isAuthenticated() ? (
        <Component {...props}/>
    ) : (
        <Redirect to={{pathname:'/signin', state:{from: props.location}}}/>
    ) }/>
)

export default PrivateRoute;