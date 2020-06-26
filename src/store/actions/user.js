export const ADD_USERS = "ADD_USERS";
export const LOGOUT = "LOGOUT";


export const addUser = (value)=>async (dispatch,getState,axios)=>{
    const res = await axios.post("/user/login",{
      ...value,
    })

    dispatch({
        type:ADD_USERS,
        payload:res.data,

    })

    return res.data;
}

export const logout = ()=>({
    type:LOGOUT
})
