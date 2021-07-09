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
import {IngredientsInterface} from "../../types/ingredients";

const initialState: IngredientsInterface = {
    data: {
        ingredients: {
            current_page: 1,
            data: [],
            total: 0
        },
        type: ""
    },
    isLoading: false
};

export const ingredientsReducer = (state = initialState, action: any): IngredientsInterface => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS:
            return {
                data: {
                    ingredients: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_INGREDIENTS_FAILURE:
            return {
                data: {
                    ingredients: state.data.ingredients,
                    type: action.type
                },
                isLoading: false
            };
        case ADD_INGREDIENT_SUCCESS:
            return {
                data: {
                    ingredients: {
                        ...state.data.ingredients,
                        data: [state.data.ingredients.data, {...action.payload}]
                    },
                    type: action.type
                },
                isLoading: false
            };
        case ADD_INGREDIENT_FAILURE:
            return {
                data: {
                    ingredients: state.data.ingredients,
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_INGREDIENT_SUCCESS:
            return {
                data: {
                    ingredients: {
                        ...state.data.ingredients,
                        data: state.data.ingredients.data && state.data.ingredients.data.map(item => {
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
        case UPDATE_INGREDIENT_FAILURE:
            return {
                data: {
                    ingredients: state.data.ingredients,
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_INGREDIENT_SUCCESS:
            return {
                ...state,
                data: {
                    ingredients: {
                        ...state.data.ingredients,
                        data: state.data.ingredients.data && state.data.ingredients.data.filter(item => item.id !== action.payload)
                    },
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_INGREDIENT_FAILURE:
            return {
                data: {
                    ingredients: state.data.ingredients,
                    type: action.type
                },
                isLoading: true
            };
        case INGREDIENTS_LOADING:
            return {
                data: {
                    ingredients: state.data.ingredients,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
}
export default ingredientsReducer;
