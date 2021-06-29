import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

export default function RouteWrapper({
                                         component: Component,
                                         isPrivate,
                                         ...rest
                                     }) {
    let currentRoute = useLocation();
    const token = Cookies.get("token");
    const signed = !!token;
    /**
     * Redirect user to SignIn page if he tries to access a private route
     * without authentication.
     */
    if (isPrivate && !signed) {
        return <Redirect push to="/login"/>;
    }
    if (currentRoute.pathname === "/login" && signed) {
        return <Redirect to="/admin/dashboard"/>;
    }
    /**
     * Redirect user to Main page if he tries to access a non private route
     * (SignIn or SignUp) after being authenticated.
     */
    // if (!signed) {
    //   return <Redirect to="login" />;
    // }

    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
    return <Route {...rest} render={() => <Component/>}/>;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool
};

RouteWrapper.defaultProps = {
    isPrivate: false
};
