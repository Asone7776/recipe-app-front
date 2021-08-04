export interface TagInterface {
    id: number,
    name: string,
    created_at?: Date,
    updated_at?: Date,
    value?:number,
}

export interface TagResponse {
    current_page: number,
    data: TagInterface[] | undefined,
    total: number
}

export interface TagsInterface {
    data: {
        tags: TagResponse,
        type: string
    },
    isLoading: boolean,
}
