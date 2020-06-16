import {applyMiddleware, createStore} from "redux";
import rootReducers from "./rootreducers";
import thunk from "redux-thunk";
import axios from "axios";

const middleware = [];

const axiosInstance = axios.create({
    baseURL:'http://localhost:5000'
})

middleware.push(thunk.withExtraArgument(axiosInstance));

const store = createStore(rootReducers,applyMiddleware(...middleware));

export default store;
