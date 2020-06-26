import {LOAD_DEVELOPING_PRODUCTS, LOAD_PRODUCTS} from "../actions/products";

const initialState = {
    productsList:[],
    loadSimpleProducts:true,
    developingProducts:[],
    loadDevelopingProducts:true,
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case LOAD_PRODUCTS:

            return{
                ...state,
                productsList: [...state.productsList,...actions.payload],
                loadSimpleProducts: false,
            }
        case LOAD_DEVELOPING_PRODUCTS:
            return{
                ...state,
                developingProducts: [...state.developingProducts,...actions.payload],
                loadDevelopingProducts: false,
            }
        default:
            return state;
    }
}
