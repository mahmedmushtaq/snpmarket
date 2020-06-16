import React from "react";
import {Grid,Divider,Button, Typography, useMediaQuery} from "@material-ui/core";
import test1 from "../../assets/images/test1.png";
import {makeStyles,useTheme} from "@material-ui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme=>({
    blogMainImg:{
        width:150,
        height:150,
    }
}));

export default props=>{
    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    return(
        <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
            <Grid item>
                <Typography variant={"h2"}>Blogs</Typography>
                <br/><br/> <br/><br/>
            </Grid>

            {/* =============== first part ==================== */}

            <React.Fragment>

            <Divider orientation={"horizontal"} style={{width:'100%',height:1}}/>
            <br/><br/>

            <Grid item container  direction={xs ? "column" : "row"} justify={xs ? "center" : undefined} alignItems={xs ? "center" : undefined}>
                <Grid item>
                    <img src={test1} className={classes.blogMainImg}/>
                </Grid>
                <Grid item style={{width:"70%",marginLeft:25,padding:"5px 20px",}}>
                    <Typography variant={"h5"} style={{}}>How to start a business?</Typography>
                    <br/>
                    <Typography component={"p"}>
                        We’re releasing Safety Gym, a suite of environments and tools for measuring progress towards reinforcement
                        learning agents which respect safety constraints while training.
                    </Typography>
                    <br/>

                    <Button  color={"primary"} component={Link} to={"/blog-details"} style={{color:'red'}}>Read More</Button>

                </Grid>
                <Grid item style={{marginTop:10,}}>
                    <Typography component={"p"}>12 November 2019</Typography>
                </Grid>


            </Grid>

            <br/><br/>
            </React.Fragment>


            {/* =============== second part ==================== */}

            <React.Fragment>

                <Divider orientation={"horizontal"} style={{width:'100%',height:1}}/>
                <br/><br/>

                <Grid item container  direction={xs ? "column" : "row"} justify={xs ? "center" : undefined} alignItems={xs ? "center" : undefined}>
                    <Grid item>
                        <img src={test1} className={classes.blogMainImg}/>
                    </Grid>
                    <Grid item style={{width:"70%",marginLeft:25,padding:"5px 20px",}}>
                        <Typography variant={"h5"} style={{}}>How to start a business?</Typography>
                        <br/>
                        <Typography component={"p"}>
                            We’re releasing Safety Gym, a suite of environments and tools for measuring progress towards reinforcement
                            learning agents which respect safety constraints while training.
                        </Typography>
                        <br/>

                        <Button  color={"primary"} style={{color:'red'}} component={Link} to={"/blog-details"}>Read More</Button>

                    </Grid>
                    <Grid item style={{marginTop:10,}}>
                        <Typography component={"p"}>12 November 2019</Typography>
                    </Grid>


                </Grid>

                <br/><br/>
            </React.Fragment>

        </Grid>
    )
}
