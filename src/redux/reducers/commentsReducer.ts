import {
    COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
} from "../constants";
import {CommentsInterface} from "../../types/comments";

const initialState: CommentsInterface = {
    data: {
        comments: {
            current_page: 1,
            data: [],
            total: 0
        },
        type: ""
    },
    isLoading: false
};
const commentsReducer = (state = initialState, action: any): CommentsInterface => {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS:
            return {
                data: {
                    comments: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_COMMENTS_FAILURE:
            return {
                data: {
                    comments: state.data.comments,
                    type: action.type
                },
                isLoading: false
            };
        case ADD_COMMENT_SUCCESS:
            return {
                data: {
                    comments: {
                        ...state.data.comments,
                        data: [state.data.comments.data, {...action.payload}]
                    },
                    type: action.type
                },
                isLoading: false
            };
        case ADD_COMMENT_FAILURE:
            return {
                data: {
                    comments: state.data.comments,
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_COMMENT_SUCCESS:
            return {
                data: {
                    comments: {
                        ...state.data.comments,
                        data: state.data.comments.data && state.data.comments.data.map(item => {
                            if (item.id === action.payload.id) {
                                item = {
                                    ...action.payload,
                                }
                            }
                            return item;
                        })
                    },
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_COMMENT_FAILURE:
            return {
                data: {
                    comments: state.data.comments,
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                data: {
                    comments: {
                        ...state.data.comments,
                        data: state.data.comments.data && state.data.comments.data.filter(item => item.id !== action.payload)
                    },
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_COMMENT_FAILURE:
            return {
                data: {
                    comments: state.data.comments,
                    type: action.type
                },
                isLoading: true
            };
        case COMMENTS_LOADING:
            return {
                data: {
                    comments: state.data.comments,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
};
export default commentsReducer;
