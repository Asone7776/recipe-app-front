import {combineReducers} from "redux";
import currentUserReducer from "./currentUserReducer";
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    categories: categoriesReducer
});
export default rootReducer;
