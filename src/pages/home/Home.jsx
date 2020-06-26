import React, {useCallback, useEffect, useState} from "react";
import {Grid,Button} from "@material-ui/core";
import {Header, Item} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../store/actions/products";


export default props=>{
    const dispatch = useDispatch();
    const {productsList,loadSimpleProducts} = useSelector(store=>store.products);
    const [page,setPage] = useState(0);
    const [pageLoadingMsg,setPageLoadingMsg] = useState("");
    const products = productsList;


    const loadMore = async ()=>{
        setPageLoadingMsg("Please wait...");
        await dispatch(loadProducts(page));
        setPageLoadingMsg("");
        setPage(page=>(page+1))
    }

    const initialProductsLoad = useCallback(async ()=>{
        if(products.length === 0){
            // fetch products only when first time component will mount
            await dispatch(loadProducts());
            setPage(page=>(page+1))
        }
    },[dispatch]);

    useEffect(()=>{
        initialProductsLoad();

    },[initialProductsLoad]);

    if(loadSimpleProducts){
        return <div>Please wait ...</div>
    }

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


           <Grid item style={{margin:"30px auto"}}>
               <Button variant={"contained"} color={"primary"} onClick={loadMore} >Load More</Button>
               {
                   pageLoadingMsg ? pageLoadingMsg : ""
               }
           </Grid>

        </Grid>
    )
}
