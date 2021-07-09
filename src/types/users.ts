export interface CurrentUserInterface {
    data: {
        user?: object,
        type: string
    },
    isLoading: boolean,
}

export interface UserInterface {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string,
    role_id: number,
    created_at?: Date,
    updated_at?: Date
}

export interface UsersLookupInterface {
    id: number,
    name: string
}
