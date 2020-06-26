import {ADD_USERS, LOGOUT} from "../actions/user";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    token:"",
    user:"",
}

const persistConfig = {
    key: 'userPersistConfig',
    storage,
}


const reducer =  (state=initialState,actions)=>{
    switch (actions.type) {
        case ADD_USERS:
            return{
                token:actions.payload.token,
                user:actions.payload.user,
            }
        case LOGOUT:
            return{
                token:"",
                user:""
            }
        default:
            return state;
    }
}


export default persistReducer(persistConfig,reducer);
//export default reducer;
