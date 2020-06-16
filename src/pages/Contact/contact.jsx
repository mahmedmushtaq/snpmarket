import React from "react";
import {Grid,Typography} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import skype from "../../assets/images/social_icons/skype.svg";
import facebook from "../../assets/images/social_icons/facebook.svg";
import twitter from "../../assets/images/social_icons/twitter.svg";
import linkedIn from "../../assets/images/social_icons/linkedin.svg";
import pinterest from "../../assets/images/social_icons/pinterest.svg";
import github from "../../assets/images/social_icons/github.svg";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme=>({
    socialIcons:{
        width:50,
        height:50,
        margin:10,
    }
}));


export default props=>{
    const classes = useStyles();
    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item>
                <br/>
                <Typography variant={"h2"}>
                    Contact Us
                </Typography>
                <br/><br/>
            </Grid>
            <Grid item>

                <Typography component={"p"}>
                    Contact us through different social media platform <br/><br/>
                    <span style={{fontSize:18,fontWeight:500}}>Email: </span><span style={{fontSize:15}}>ahmedmushtaq296@gmail.com</span>
                </Typography>
                <br/><br/>
            </Grid>
            <Grid item>

                <a href="https://www.linkedin.com/in/m-ahmed-mushtaq-87915a19a/">  <img src={linkedIn}  className={classes.socialIcons}/></a>
                <a href="https://www.facebook.com/profile.php?id=100009758324624"> <img src={facebook}  className={classes.socialIcons}/></a>
                <a href="https://twitter.com/mahmedmushtaq3">  <img src={twitter}  className={classes.socialIcons}/></a>
                <a href="https://www.pinterest.com/injurdlion332/">  <img src={pinterest}  className={classes.socialIcons}/></a>
                <a href="https://join.skype.com/invite/fYSVXgPVE0bZ">  <img src={skype}  className={classes.socialIcons}/></a>
                <a href="https://github.com/mahmedmushtaq">  <img src={github}  className={classes.socialIcons}/></a>


            </Grid>

        </Grid>
    )
}
