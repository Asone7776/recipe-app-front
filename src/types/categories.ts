export interface CategoryInterface {
    id: number,
    name: string,
    description?: string,
    created_at: Date,
    updated_at: Date,
    value?:number,
}

export interface CategoryResponse {
    current_page: number,
    data: CategoryInterface[] | undefined,
    total: number
}

export interface CategoriesInterface {
    data: {
        categories: CategoryResponse,
        type: string
    },
    isLoading: boolean,
}
