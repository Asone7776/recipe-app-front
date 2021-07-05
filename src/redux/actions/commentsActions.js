import {
    COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
} from "../constants";
import {axiosAuth} from "../../axios-instances";
import {successNotify, failureNotify} from "../../notifications";


export const getComments = params => {
    return async dispatch => {
        dispatch(commentsLoading());
        await axiosAuth
            .get("/api/comments", {
                params
            })
            .then(response => {
                dispatch(commentsSuccess(GET_COMMENTS_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(commentsFailure(GET_COMMENTS_FAILURE));
                    failureNotify(error.response.data.detail);
                }
            });
    };
};

export const addComment = data => {
    return async dispatch => {
        dispatch(commentsLoading());
        await axiosAuth
            .post("/api/comments", data)
            .then(response => {
                dispatch(commentsSuccess(ADD_COMMENT_SUCCESS, response.data));
                successNotify("Комментарий добавлен");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.title);
                    dispatch(commentsFailure(ADD_COMMENT_FAILURE));
                }
            });
    };
};

export const updateCategory = (data) => {
    return async dispatch => {
        dispatch(commentsLoading());
        await axiosAuth
            .put(`/api/comments/${data.id}`, data)
            .then(response => {
                successNotify("Комментарий обновлен");
                dispatch(commentsSuccess(UPDATE_COMMENT_SUCCESS, response.data));
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(commentsFailure(UPDATE_COMMENT_FAILURE));
                }
            });
    };
};


export const deleteComment = id => {
    return async dispatch => {
        await axiosAuth
            .delete(`/api/comments/${id}`)
            .then(() => {
                dispatch(commentsSuccess(DELETE_COMMENT_SUCCESS, id));
                successNotify("Комментарий удалён");
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    failureNotify(error.response.data.detail);
                    dispatch(commentsFailure(DELETE_COMMENT_FAILURE));
                }
            });
    };
};


const commentsSuccess = (type, data) => ({
    type: type,
    payload: data
});

const commentsLoading = type => ({
    type: type ? type : COMMENTS_LOADING
});

const commentsFailure = type => ({
    type: type
});
