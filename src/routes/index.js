import React, {useEffect} from "react";
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
import TagsList from "../containers/tags/List";
import AddAndEditTag from "../containers/tags/AddAndEditTag";
import CommentsList from "../containers/comments/List";
import AddAndEditComment from "../containers/comments/AddAndEditComment";
import IngredientsList from "../containers/ingredients/List";
import AddAndEditIngredient from "../containers/ingredients/AddAndEditIngredient";

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
            {
                exact: true,
                path: '/admin/tags',
                isPrivate: true,
                component: TagsList
            },
            {
                exact: true,
                path: '/admin/tags/add',
                isPrivate: true,
                component: AddAndEditTag
            },
            {
                exact: true,
                path: '/admin/tags/edit/:id',
                isPrivate: true,
                component: AddAndEditTag
            },
            {
                exact: true,
                path: '/admin/comments',
                isPrivate: true,
                component: CommentsList
            },
            {
                exact: true,
                path: '/admin/comments/add',
                isPrivate: true,
                component: AddAndEditComment
            },
            {
                exact: true,
                path: '/admin/comments/edit/:id',
                isPrivate: true,
                component: AddAndEditComment
            },
            {
                exact: true,
                path: '/admin/ingredients',
                isPrivate: true,
                component: IngredientsList
            },
            {
                exact: true,
                path: '/admin/ingredients/add',
                isPrivate: true,
                component: AddAndEditIngredient
            },
            {
                exact: true,
                path: '/admin/ingredients/edit/:id',
                isPrivate: true,
                component: AddAndEditIngredient
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
