import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {Item} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {loadProducts, loadDevelopingProducts} from "../../store/actions/products";


export default props=>{
    const dispatch = useDispatch();
    const developingProducts = useSelector(store=>store.products.developingProducts);
    const loading  = useSelector(store=>store.products.loadDevelopingProducts);
    const [page,setPage] = useState(0);
    const [pageLoadingMsg,setPageLoadingMsg] = useState("");



    const loadMore = async ()=>{
        setPageLoadingMsg("Please wait...");
        await dispatch(loadDevelopingProducts(page));
        setPageLoadingMsg("");
        setPage(page=>(page+1))
    }

    const loadProducts= useCallback(async ()=>{
        if(developingProducts.length === 0){
           await dispatch(loadDevelopingProducts())
            setPage(page=>(page+1));
        }
    },[]);

    useEffect(()=>{
        loadProducts();
    },[loadProducts]);

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item>
                <br/>
                <Typography variant={"h2"}>Developing</Typography>
            </Grid>
            <Grid item>
                <br/><br/><br/>
                <Grid container justify={"center"} alignItems={"center"}>

                    {
                        loading ? "Please wait ...." : developingProducts.length === 0 ?
                            <Typography variant={"h5"}>No Product is Found</Typography>:
                            developingProducts.map(product=>(
                                <Grid item key={product._id}>
                                    <Item product={product}/>
                                </Grid>
                            ))

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
