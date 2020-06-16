import {combineReducers} from "redux";
import products from "./reducers/products";

const rootReducers = combineReducers({
    products
});

export default rootReducers;
