import {combineReducers} from "redux";
import products from "./reducers/products";
import blogs from "./reducers/blogs";
import user from "./reducers/user";

const rootReducers = combineReducers({
    products,
    blogs,
    user
});

export default rootReducers;
