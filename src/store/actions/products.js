export const LOAD_PRODUCTS = "ADD_PRODUCTS";
export const LOAD_DEVELOPING_PRODUCTS = "ADD_DEVELOPING_PRODUCTS";

export const loadProducts = (page)=>async (dispatch, getState, axios)=>{
   const res = await axios.get("/product/list?status=developed&page="+page);

   dispatch({
      type:LOAD_PRODUCTS,
      payload:res.data,
   })
}

export const loadDevelopingProducts = (page)=>async (dispatch,getState,axios)=>{
   const res = await axios.get("/product/list?status=developing&page="+page);
   dispatch({
      type:LOAD_DEVELOPING_PRODUCTS,
      payload:res.data,
   })
}


