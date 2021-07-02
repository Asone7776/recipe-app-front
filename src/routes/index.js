import React, {useEffect, FC} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CustomRoute from "./Route";
import SignInLayout from '../layouts/SignInLayout';
import Login from '../containers/Login';
import {getUser} from "../redux/actions/usersActions";
import Cookies from "js-cookie";
import DashLayout from '../layouts/DashLayout';
import DashBoard from "../containers/DashBoard";
import CategoriesList from "../containers/categories/List";
import AddAndEditCategory from "../containers/categories/AddAndEditCategory";

export const routes = [
    {
        layout: DashLayout,
        subRoutes: [
            {
                exact: true,
                path: '/admin/dashboard',
                isPrivate: true,
                component: DashBoard
            },
            {
                exact: true,
                path: '/admin/categories',
                isPrivate: true,
                component: CategoriesList
            },
            {
                exact: true,
                path: '/admin/categories/add',
                isPrivate: true,
                component: AddAndEditCategory
            },
            {
                exact: true,
                path: '/admin/categories/edit/:id',
                isPrivate: true,
                component: AddAndEditCategory
            },
        ]
    },
    {
        layout: SignInLayout,
        subRoutes: [
            {
                isPrivate: false,
                path: "/login",
                component: Login
            }
        ]
    }
];

const Routes = () => {
    let signed = Cookies.get("token");
    let currentUser = useSelector(state => state.currentUser);
    let dispatch = useDispatch();
    useEffect(() => {
        if (
            signed &&
            currentUser.data.user &&
            Object.keys(currentUser.data.user).length === 0
        ) {
            dispatch(getUser());
        }
    }, [dispatch, signed, currentUser.data.user]);
    return (
        <Router>
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        exact={route.subRoutes.some(r => r.exact)}
                        path={route.subRoutes.map(r => r.path)}
                        isPrivate={route.subRoutes.some(r => r.isPrivate)}
                    >
                        <route.layout>
                            {route.subRoutes.map((subRoute, i) => (
                                <CustomRoute
                                    key={i}
                                    {...subRoute}
                                    component={subRoute.component}
                                />
                            ))}
                        </route.layout>
                    </Route>
                ))}
                <Route exact path={'/'}>
                    <Redirect to={'/login'}/>
                </Route>
            </Switch>
        </Router>
    );
};
export default Routes;
