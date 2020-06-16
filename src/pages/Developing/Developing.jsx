import React, {useCallback, useEffect} from "react";
import {Grid,Typography} from "@material-ui/core";
import {Item} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {loadDevelopingProducts} from "../../store/actions/products";


export default props=>{
    const dispatch = useDispatch();
    const developingProducts = useSelector(store=>store.products.developingProducts);
    const loading  = useSelector(store=>store.products.loadDevelopingProducts);

    const loadProducts= useCallback(async ()=>{
        if(developingProducts.length === 0){
           await dispatch(loadDevelopingProducts())
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
        </Grid>
    )
}
