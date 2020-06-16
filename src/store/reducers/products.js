import {ADD_DEVELOPING_PRODUCTS, ADD_PRODUCTS} from "../actions/products";

const initialState = {
    productsList:[],
    loadSimpleProducts:true,
    developingProducts:[],
    loadDevelopingProducts:true,
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case ADD_PRODUCTS:

            return{
                ...state,
                productsList: [...state.productsList,...actions.payload],
                loadSimpleProducts: false,
            }
        case ADD_DEVELOPING_PRODUCTS:
            return{
                ...state,
                developingProducts: [...state.developingProducts,...actions.payload],
                loadDevelopingProducts: false,
            }
        default:
            return state;
    }
}
