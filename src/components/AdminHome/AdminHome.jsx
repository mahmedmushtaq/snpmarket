import React from "react";
import {Grid,Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../store/actions/user";

export default props=>{
    const dispatch = useDispatch();
    return(
        <Grid container justify={"center"} style={{height:'70vh'}} alignItems={"center"} direction={"column"}>
            <Grid item >
                <Typography variant={"h5"} component={Link} to={"/admin/PPtOZUqsAnwWadvGmNAw/new-blog"}>Add New Blog</Typography>
            </Grid>
            <Grid item>
                <br/>
                <Typography variant={"h5"} component={Link} to={"/admin/VTStzKzBcgsICKswVxyG/new-product"}>Add New Product</Typography>
            </Grid>

            <Grid item>
                <br/>
                <Typography variant={"h5"} onClick={()=>dispatch(logout())}>Logout</Typography>
            </Grid>
        </Grid>
    )
}
