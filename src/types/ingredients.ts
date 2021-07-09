import {RecipeInterface} from "./recipes";

export interface IngredientInterface {
    id: number,
    name: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
    recipes: RecipeInterface[]
}

export interface IngredientsResponse {
    current_page: number,
    data: IngredientInterface[] | undefined,
    total: number
}

export interface IngredientsInterface {
    data: {
        ingredients: IngredientsResponse,
        type: string
    },
    isLoading: boolean,
}
