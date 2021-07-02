import {
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    USER_LOADING,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS, USER_LOGOUT_FAILURE,
    USER_LOGOUT_SUCCESS
} from "../constants";
import {CurrentUserInterface} from "../../types/currentUser";

const initialState: CurrentUserInterface = {
    data: {
        user: {},
        type: ""
    },
    isLoading: false
};
const currentUserReducer = (state = initialState, action: any): CurrentUserInterface => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                data: {
                    type: action.type
                },
                isLoading: false
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                data: {
                    type: action.type
                },
                isLoading: false
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                data: {
                    user: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                data: {
                    user: state.data.user,
                    type: action.type
                },
                isLoading: false
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                data: {
                    type: action.type
                },
                isLoading: false
            };
        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                data: {
                    user: state.data.user,
                    type: action.type
                },
                isLoading: false
            };
        case USER_LOADING:
            return {
                data: {
                    user: state.data.user,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
};
export default currentUserReducer;
