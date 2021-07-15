import {IngredientInterface} from "./ingredients";

export interface RecipeInterface {
    id: number,
    name: string,
    description?: string,
    time_to_complete?: Date,
    likes?: number,
    lever_id?: number,
    created_at?: Date,
    updated_at?: Date
}

export interface RecipesLookupInterface {
    id: number,
    name: string
}

export interface RecipesResponse {
    current_page: number,
    data: RecipeInterface[] | undefined,
    total: number
}

export interface RecipesInterface {
    data: {
        recipes: RecipesResponse,
        type: string
    },
    isLoading: boolean,
}
