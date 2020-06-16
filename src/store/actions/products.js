export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const ADD_DEVELOPING_PRODUCTS = "ADD_DEVELOPING_PRODUCTS";

export const addProducts = ()=>async (dispatch,getState,axios)=>{
   const res = await axios.get("/product/list/developed");

   dispatch({
      type:ADD_PRODUCTS,
      payload:res.data,
   })
}

export const loadDevelopingProducts = ()=>async (dispatch,getState,axios)=>{
   const res = await axios.get("/product/list/developing");
   dispatch({
      type:ADD_DEVELOPING_PRODUCTS,
      payload:res.data,
   })
}


