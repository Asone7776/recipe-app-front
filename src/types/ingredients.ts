import {RecipeInterface} from "./recipes";

export interface IngredientInterface {
    id: number,
    name: string,
    description?: string,
    created_at?: Date,
    updated_at?: Date,
    recipes: RecipeInterface[]
    value?: number,
    pivot?: {
        ingredient_id: number,
        recipe_id: number,
        count: number,
        unit: number
    }
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

export interface IngredientsListInterface {
    ingredient_id: number,
    count: number,
    unit: number
}
