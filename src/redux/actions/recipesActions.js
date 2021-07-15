import {
    RECIPES_LOADING,
    GET_RECIPES_SUCCESS,
    GET_RECIPES_FAILURE,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAILURE,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_FAILURE,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAILURE
} from "../constants";

import {axiosAuth} from "../../axios-instances";
import {failureNotify, successNotify} from "../../notifications";


export const getRecipes = params => {
    return async dispatch => {
        dispatch(recipesLoading());
        await axiosAuth
            .get("/api/recipes", {
                params
            })
            .then(response => {
                dispatch(recipesSuccess(GET_RECIPES_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(recipesFailure(GET_RECIPES_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addRecipes = data => {
    return async dispatch => {
        dispatch(recipesLoading());
        await axiosAuth
            .post("/api/recipes", data)
            .then(response => {
                dispatch(recipesSuccess(ADD_RECIPE_SUCCESS, response.data));
                successNotify("Рецепт добавлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(recipesFailure(ADD_RECIPE_FAILURE));
                }
            });
    };
};

export const updateRecipe = (data) => {
    return async dispatch => {
        dispatch(recipesLoading());
        await axiosAuth
            .put(`/api/recipes/${data.id}`, data)
            .then(response => {
                successNotify("Рецепт обновлен");
                dispatch(recipesSuccess(UPDATE_RECIPE_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(recipesFailure(UPDATE_RECIPE_FAILURE));
                }
            });
    };
};


export const deleteRecipe = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/recipes/${id}`)
            .then(() => {
                dispatch(recipesSuccess(DELETE_RECIPE_SUCCESS, id));
                successNotify("Рецепт удален");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(recipesFailure(DELETE_RECIPE_FAILURE));
                }
            });
    };
};


const recipesSuccess = (type, data) => ({
    type: type,
    payload: data
});

const recipesLoading = type => ({
    type: type ? type : RECIPES_LOADING
});

const recipesFailure = type => ({
    type: type
});
