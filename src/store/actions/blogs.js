export const LOAD_BLOGS = "ADD_BLOGS";

export const loadBlogs = (page)=>async (dispatch, getState, axios)=>{
    const res  = await axios.get("/blog/list?page="+page);

    dispatch({
        type:LOAD_BLOGS,
        payload:res.data,
    })
}
