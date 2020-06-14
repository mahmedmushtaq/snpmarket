import React from "react";
import {Grid} from "@material-ui/core";
import {Header, Item} from "../../components";


export default props=>{
    return(
        <Grid container direction={"column"}>
            <Grid item>
                <Header/>

            </Grid>
            <br/><br/>
            <Grid item>
               <Grid container justify={"center"} alignItems={"center"}>
                  <Grid item>
                      <Item/>
                  </Grid>
                   <Grid item>
                       <Item/>
                   </Grid>
                   <Grid item>
                       <Item/>
                   </Grid>
                   <Grid item>
                       <Item/>
                   </Grid>
                   <Grid item>
                       <Item/>
                   </Grid>
                   <Grid item>
                       <Item/>
                   </Grid>
               </Grid>
            </Grid>

        </Grid>
    )
}
