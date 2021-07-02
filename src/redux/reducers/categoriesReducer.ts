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
import {CategoriesInterface} from "../../types/categories";

const initialState: CategoriesInterface = {
    data: {
        categories: {
            current_page: 1,
            data: [],
            total: 0
        },
        type: ""
    },
    isLoading: false
};
const categoriesReducer = (state = initialState, action: any): CategoriesInterface => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                data: {
                    categories: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_CATEGORIES_FAILURE:
            return {
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: false
            };
        case ADD_CATEGORY_SUCCESS:
            return {
                data: {
                    categories: {
                        ...state.data.categories,
                        data: [state.data.categories.data, {...action.payload}]
                    },
                    type: action.type
                },
                isLoading: false
            };
        case ADD_CATEGORY_FAILURE:
            return {
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                data: {
                    categories: {
                        ...state.data.categories,
                        data: state.data.categories.data && state.data.categories.data.map(item => {
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
        case UPDATE_CATEGORY_FAILURE:
            return {
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                data: {
                    categories: {
                        ...state.data.categories,
                        data: state.data.categories.data && state.data.categories.data.filter(item => item.id !== action.payload)
                    },
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_CATEGORY_FAILURE:
            return {
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: true
            };
        case CATEGORIES_LOADING:
            return {
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
};
export default categoriesReducer;
