import {applyMiddleware, createStore} from "redux";
import rootReducers from "./rootreducers";
import thunk from "redux-thunk";
import axios from "axios";
import url from "../others/baseUrl";
import { persistStore } from 'redux-persist';

const middleware = [];

const axiosInstance = axios.create({
    baseURL:url.baseURI
})

middleware.push(thunk.withExtraArgument(axiosInstance));

export const store = createStore(rootReducers,applyMiddleware(...middleware));

export const persistor = persistStore(store);
