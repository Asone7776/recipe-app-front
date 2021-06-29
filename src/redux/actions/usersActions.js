import {
    USER_LOGIN_SUCCESS,
    USERS_LOADING,
    USER_LOGIN_FAILURE,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE, USER_LOADING, GET_USER_SUCCESS, GET_USER_FAILURE, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE,
} from "../constants";
import {axiosDefault as axios, axiosAuth} from "../../axios-instances";
import {successNotify, failureNotify} from "../../notifications";
import Cookies from "js-cookie";

export const getUsers = params => {
    return async dispatch => {
        dispatch(usersLoading());
        await axiosAuth
            .get("/api/users", {
                params
            })
            .then(response => {
                dispatch(usersSuccess(GET_USERS_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(usersFailure(GET_USERS_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addUser = data => {
    return async dispatch => {
        dispatch(usersLoading());
        await axiosAuth
            .post("/api/users", data)
            .then(response => {
                console.log(response.data);
                dispatch(usersSuccess(ADD_USER_SUCCESS, response.data));
                successNotify("Пользователь добавлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(usersFailure(ADD_USER_FAILURE));
                }
            });
    };
};

export const updateUser = data => {
    return async dispatch => {
        dispatch(usersLoading());
        await axiosAuth
            .put("/api/users", data)
            .then(response => {
                successNotify("Пользователь обновлен");
                dispatch(usersSuccess(UPDATE_USER_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(usersFailure(UPDATE_USER_FAILURE));
                }
            });
    };
};
export const updateUserStatus = (user, params) => {
    return async dispatch => {
        dispatch(usersLoading());
        await axiosAuth
            .put(`/api/users/${user.id}`, null, {
                params
            })
            .then(() => {
                dispatch(usersSuccess(UPDATE_USER_SUCCESS, user));
                successNotify("Статус обновлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(usersFailure(UPDATE_USER_FAILURE));
                }
            });
    };
};

export const deleteUser = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/users/${id}`)
            .then(() => {
                dispatch(usersSuccess(DELETE_USER_SUCCESS, id));
                successNotify("Пользователь удален");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(usersFailure(DELETE_USER_FAILURE));
                }
            });
    };
};


export const loginUser = data => {
    return async dispatch => {
        dispatch(usersLoading());
        await axios
            .post("/api/login", data)
            .then(response => {
                Cookies.set("token", response.data.token);
                dispatch(usersSuccess(USER_LOGIN_SUCCESS));
                successNotify("Вы успешно вошли в систему", "/admin");
            })
            .then(() => {
                dispatch(getUser());
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(usersFailure(USER_LOGIN_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch(usersLoading());
        await axiosAuth
            .post("/api/logout")
            .then(response => {
                Cookies.remove("token");
                dispatch(usersSuccess(USER_LOGOUT_SUCCESS));
                successNotify(response.data.message);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(usersFailure(USER_LOGOUT_FAILURE));
                    failureNotify(error.response.data.message);
                }
            });
    };
};

export const getUser = () => {
    return async dispatch => {
        dispatch(usersLoading(USER_LOADING));
        await axiosAuth
            .get("/api/current-user")
            .then(response => {
                dispatch(usersSuccess(GET_USER_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(usersFailure(GET_USER_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};


const usersSuccess = (type, data) => ({
    type: type,
    payload: data
});

const usersLoading = type => ({
    type: type ? type : USERS_LOADING
});

const usersFailure = type => ({
    type: type
});
