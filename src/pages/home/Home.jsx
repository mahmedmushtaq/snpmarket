import React, {useCallback, useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Header, Item} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {addProducts} from "../../store/actions/products";


export default props=>{
    const dispatch = useDispatch();
    const products = useSelector(store=>store.products.productsList);

    const initialProductsLoad = useCallback(async ()=>{
        if(products.length === 0){
            // fetch products only when first time component will mount
            await dispatch(addProducts());
        }
    },[dispatch]);

    useEffect(()=>{
        initialProductsLoad();

    },[initialProductsLoad]);

    return(
        <Grid container direction={"column"}>
            <Grid item>
                <Header/>

            </Grid>
            <br/><br/>
            <Grid item>
               <Grid container justify={"center"} alignItems={"center"}>
                   {
                       products.map((product,index)=>{

                           return(
                               (
                                   <Grid item key={product._id}>
                                       <Item product={product}/>
                                   </Grid>
                               )
                           )
                       })
                   }


               </Grid>
            </Grid>

        </Grid>
    )
}
