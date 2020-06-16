import React from "react";
import {Grid,Typography} from "@material-ui/core";
import Test1 from "../../assets/images/test1.png";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme=>({
    root:{
        paddingBottom:200,
    }
}));

export default props=>{
    const classes = useStyles();
    return(
        <Grid className={classes.root} container direction={"column"} style={{width:"70%",margin:'auto'}} alignItems={"center"}>
           <Grid item>
               <br/><br/><br/>
               <Typography variant={"h2"} style={{fontSize:31,fontWeight:700,}}>Heading</Typography>
               <br/><br/>
           </Grid>
            <Grid item>
                <img src={Test1} style={{width:'100%',}} alt=""/>
            </Grid>
            <br/><br/>
            <Grid item align={"center"}>
                <Typography variant={"h2"}>
                  Published By
                </Typography>
                <Typography component={"p"}>
                    M Ahmed Mushtaq
                </Typography>
            </Grid>


        </Grid>
    )
}
