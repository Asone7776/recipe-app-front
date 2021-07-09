import {combineReducers} from "redux";
import currentUserReducer from "./currentUserReducer";
import categoriesReducer from './categoriesReducer';
import tagsReducer from "./tagsReducer";
import commentsReducer from "./commentsReducer";
import ingredientsReducer from './ingredientsReducer';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    ingredients: ingredientsReducer
});
export default rootReducer;
