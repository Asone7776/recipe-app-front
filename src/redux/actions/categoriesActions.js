import {
    CATEGORIES_LOADING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE
} from "../constants";
import {axiosAuth} from "../../axios-instances";
import {successNotify, failureNotify} from "../../notifications";

export const getCategories = params => {
    return async dispatch => {
        dispatch(categoriesLoading());
        await axiosAuth
            .get("/api/categories", {
                params
            })
            .then(response => {
                dispatch(categoriesSuccess(GET_CATEGORIES_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(categoriesFailure(GET_CATEGORIES_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addCategory = data => {
    return async dispatch => {
        dispatch(categoriesLoading());
        await axiosAuth
            .post("/api/categories", data)
            .then(response => {
                dispatch(categoriesSuccess(ADD_CATEGORY_SUCCESS, response.data));
                successNotify("Категория добавлена");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(categoriesFailure(ADD_CATEGORY_FAILURE));
                }
            });
    };
};

export const updateCategory = (data) => {
    return async dispatch => {
        dispatch(categoriesLoading());
        await axiosAuth
            .put(`/api/categories/${data.id}`, data)
            .then(response => {
                successNotify("Категория обновлена");
                dispatch(categoriesSuccess(UPDATE_CATEGORY_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(categoriesFailure(UPDATE_CATEGORY_FAILURE));
                }
            });
    };
};


export const deleteCategory = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/categories/${id}`)
            .then(() => {
                dispatch(categoriesSuccess(DELETE_CATEGORY_SUCCESS, id));
                successNotify("Категория удалена");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(categoriesFailure(DELETE_CATEGORY_FAILURE));
                }
            });
    };
};


const categoriesSuccess = (type, data) => ({
    type: type,
    payload: data
});

const categoriesLoading = type => ({
    type: type ? type : CATEGORIES_LOADING
});

const categoriesFailure = type => ({
    type: type
});
