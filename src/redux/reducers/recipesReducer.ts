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
import {RecipesInterface} from "../../types/recipes";

const initialState: RecipesInterface = {
    data: {
        recipes: {
            current_page: 1,
            data: [],
            total: 0
        },
        type: ""
    },
    isLoading: false
};

export const recipesReducer = (state = initialState, action: any): RecipesInterface => {
    switch (action.type) {
        case GET_RECIPES_SUCCESS:
            return {
                data: {
                    recipes: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_RECIPES_FAILURE:
            return {
                data: {
                    recipes: state.data.recipes,
                    type: action.type
                },
                isLoading: false
            };
        case ADD_RECIPE_SUCCESS:
            return {
                data: {
                    recipes: {
                        ...state.data.recipes,
                        data: [state.data.recipes.data, {...action.payload}]
                    },
                    type: action.type
                },
                isLoading: false
            };
        case ADD_RECIPE_FAILURE:
            return {
                data: {
                    recipes: state.data.recipes,
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_RECIPE_SUCCESS:
            return {
                data: {
                    recipes: {
                        ...state.data.recipes,
                        data: state.data.recipes.data && state.data.recipes.data.map(item => {
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
        case UPDATE_RECIPE_FAILURE:
            return {
                data: {
                    recipes: state.data.recipes,
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                data: {
                    recipes: {
                        ...state.data.recipes,
                        data: state.data.recipes.data && state.data.recipes.data.filter(item => item.id !== action.payload)
                    },
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_RECIPE_FAILURE:
            return {
                data: {
                    recipes: state.data.recipes,
                    type: action.type
                },
                isLoading: true
            };
        case RECIPES_LOADING:
            return {
                data: {
                    recipes: state.data.recipes,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
}
export default recipesReducer;
