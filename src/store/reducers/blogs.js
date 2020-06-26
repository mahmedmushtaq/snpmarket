import {LOAD_BLOGS} from "../actions/blogs";

const initialState = {
    blogsList: [],
    blogsLoading:true,
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case LOAD_BLOGS:
            return{
                ...state,
                blogsList: [...state.blogsList,...actions.payload],
                blogsLoading: false,
            }
        default:
            return state;
    }
}
