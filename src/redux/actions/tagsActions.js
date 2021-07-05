import {
    TAGS_LOADING,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE,
    UPDATE_TAG_SUCCESS,
    UPDATE_TAG_FAILURE,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILURE,
} from "../constants";
import {axiosAuth} from "../../axios-instances";
import {failureNotify, successNotify} from "../../notifications";


export const getTags = params => {
    return async dispatch => {
        dispatch(tagsLoading());
        await axiosAuth
            .get("/api/tags", {
                params
            })
            .then(response => {
                dispatch(tagsSuccess(GET_TAGS_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(tagsFailure(GET_TAGS_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addTag = data => {
    return async dispatch => {
        dispatch(tagsLoading());
        await axiosAuth
            .post("/api/tags", data)
            .then(response => {
                dispatch(tagsSuccess(ADD_TAG_SUCCESS, response.data));
                successNotify("Тэг добавлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(tagsFailure(ADD_TAG_FAILURE));
                }
            });
    };
};

export const updateTag = (data) => {
    return async dispatch => {
        dispatch(tagsLoading());
        await axiosAuth
            .put(`/api/tags/${data.id}`, data)
            .then(response => {
                successNotify("Тэг обновлен");
                dispatch(tagsSuccess(UPDATE_TAG_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(tagsFailure(UPDATE_TAG_FAILURE));
                }
            });
    };
};


export const deleteTag = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/tags/${id}`)
            .then(() => {
                dispatch(tagsSuccess(DELETE_TAG_SUCCESS, id));
                successNotify("Тэг удален");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(tagsFailure(DELETE_TAG_FAILURE));
                }
            });
    };
};


const tagsSuccess = (type, data) => ({
    type: type,
    payload: data
});

const tagsLoading = type => ({
    type: type ? type : TAGS_LOADING
});

const tagsFailure = type => ({
    type: type
});
