import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {currentUserInterface} from "./types";

export interface IRootState {
    currentUser: currentUserInterface
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware<IRootState, any>(reducers);
