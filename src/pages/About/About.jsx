import React from "react";
import {Grid,Typography} from "@material-ui/core";

import logo from "../../assets/images/logotransparent.png";


export default props=>{
    return(
        <Grid container alignItems={"center"} direction={"column"}>
            <Grid item>
               <Typography variant={"h2"}>About</Typography>
            </Grid>
            <br/><br/>

            <Grid item>
                <img src={logo} style={{width:300,height:300,borderRadius:"50%",}} alt=""/>

            </Grid>
            <Grid item style={{width:'60%',textAlign:'center'}}>
                <br/>
                <Typography component={"p"}>
                  MARTSNP (market of software and prototypes) is a platform which provides different type of software and prototypes to increase
                    the developing process. <br/>It is developed By <h2>M Ahmed Mushtaq</h2>
                </Typography>
            </Grid>
            <br/><br/><br/><br/><br/>

        </Grid>
    )
}
