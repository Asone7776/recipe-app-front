import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {CurrentUserInterface} from "../types/users";
import {CategoriesInterface} from "../types/categories";
import {TagsInterface} from "../types/tags";
import {CommentsInterface} from "../types/comments";
import {IngredientsInterface} from "../types/ingredients";
import {RecipesInterface} from "../types/recipes";

export interface IRootState {
    currentUser: CurrentUserInterface,
    categories: CategoriesInterface,
    tags: TagsInterface,
    comments: CommentsInterface,
    ingredients: IngredientsInterface,
    recipes: RecipesInterface
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware<IRootState, any>(reducers);
