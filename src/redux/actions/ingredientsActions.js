import {
    INGREDIENTS_LOADING,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILURE,
    ADD_INGREDIENT_SUCCESS,
    ADD_INGREDIENT_FAILURE,
    UPDATE_INGREDIENT_SUCCESS,
    UPDATE_INGREDIENT_FAILURE,
    DELETE_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_FAILURE
} from "../constants";
import {axiosAuth} from "../../axios-instances";
import {failureNotify, successNotify} from "../../notifications";


export const getIngredients = params => {
    return async dispatch => {
        dispatch(ingredientsLoading());
        await axiosAuth
            .get("/api/ingredients", {
                params
            })
            .then(response => {
                dispatch(ingredientsSuccess(GET_INGREDIENTS_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(tagsFailure(GET_INGREDIENTS_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addIngredient = data => {
    return async dispatch => {
        dispatch(ingredientsLoading());
        await axiosAuth
            .post("/api/ingredients", data)
            .then(response => {
                dispatch(ingredientsSuccess(ADD_INGREDIENT_SUCCESS, response.data));
                successNotify("Ингредиент добавлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(tagsFailure(ADD_INGREDIENT_FAILURE));
                }
            });
    };
};

export const updateIngredient = (data) => {
    return async dispatch => {
        dispatch(ingredientsLoading());
        await axiosAuth
            .put(`/api/ingredients/${data.id}`, data)
            .then(response => {
                successNotify("Ингредиент обновлен");
                dispatch(ingredientsSuccess(UPDATE_INGREDIENT_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(tagsFailure(UPDATE_INGREDIENT_FAILURE));
                }
            });
    };
};


export const deleteIngredient = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/ingredients/${id}`)
            .then(() => {
                dispatch(ingredientsSuccess(DELETE_INGREDIENT_SUCCESS, id));
                successNotify("Ингредиент удален");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(tagsFailure(DELETE_INGREDIENT_FAILURE));
                }
            });
    };
};


const ingredientsSuccess = (type, data) => ({
    type: type,
    payload: data
});

const ingredientsLoading = type => ({
    type: type ? type : INGREDIENTS_LOADING
});

const tagsFailure = type => ({
    type: type
});
