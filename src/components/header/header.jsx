import React from "react";
import {Grid,Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import bg from "../../assets/images/bg.svg";
import {TopBar} from "../../components";
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme=>({
    root:{
        padding:"10px"
    }

}));

export default props=>{
    const classes = useStyles();
    return(
        <Grid container direction={"column"} className={classes.root}>


        <Grid  item container >
         <Grid item>
             <Typography style={{margin:"0 10px 0 0"}}>
                All
             </Typography>
         </Grid>
         <Grid item style={{marginLeft:"auto",backgroundColor:"white",padding:"5px 20px",borderRadius:2,boxShadow:"0 0 1px 0px rgba(0,0,0,.6)"}}>

             <Grid container>
             <Grid item>
                 <FilterListIcon/>
             </Grid>
                 <Grid item>
                     <Typography >
                         Filter
                     </Typography>
                 </Grid>
             </Grid>

         </Grid>



        </Grid>
            <br/><br/>
            <Grid item>
                <Typography variant={"h5"}>
                    Checkout our popular prototypes
                </Typography>
            </Grid>
        </Grid>
    )
}
