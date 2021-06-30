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
import {CategoriesInterface, CategoryResponse} from "../types/categories";

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
                ...state,
                data: {
                    categories: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                data: {
                    categories: state.data.categories,
                    type: action.type
                },
                isLoading: false
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
