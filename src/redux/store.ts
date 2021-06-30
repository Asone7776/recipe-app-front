import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {CurrentUserInterface} from "./types/currentUser";
import {CategoriesInterface} from "./types/categories";

export interface IRootState {
    currentUser: CurrentUserInterface,
    categories: CategoriesInterface
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware<IRootState, any>(reducers);
