export interface RecipeInterface {
    id: number,
    name: string,
    description?: string,
    time_to_complete?: Date,
    likes?: number,
    lever_id?: number,
    created_at?:Date,
    updated_at?:Date
}

export interface RecipesLookupInterface {
    id: number,
    name: string
}
