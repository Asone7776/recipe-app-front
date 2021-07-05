import {UserInterface} from "./users";
import {RecipeInterface} from "./recipes";

export interface CommentInterface {
    id: number,
    name: string,
    message?: string,
    created_at?: Date,
    updated_at?: Date,
    user: UserInterface,
    recipes: RecipeInterface
}

export interface CommentsResponse {
    current_page: number,
    data: CommentInterface[] | undefined,
    total: number
}

export interface CommentsInterface {
    data: {
        comments: CommentsResponse,
        type: string
    },
    isLoading: boolean,
}
