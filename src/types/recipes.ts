import {IngredientInterface} from "./ingredients";
import {CategoryInterface} from "./categories";
import {TagInterface} from "./tags";

export interface RecipeInterface {
    id: number,
    name: string,
    description?: string,
    time_to_complete?: Date,
    likes?: number,
    level_id?: number,
    created_at: Date,
    updated_at: Date,
    categories: CategoryInterface[] | [],
    tags: TagInterface[] | [],
    ingredients: IngredientInterface[] | [],
    details: RecipesDetailsInterface[] | []
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

export interface RecipesDetailsInterface {
    name: string,
    description?: string,
    position?: string
}
