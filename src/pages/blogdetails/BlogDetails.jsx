import React, {useCallback, useEffect, useState} from "react";
import {Grid, Typography, useMediaQuery} from "@material-ui/core";
import Test1 from "../../assets/images/test1.png";
import {makeStyles, useTheme} from "@material-ui/styles";
import url from "../../others/baseUrl";
import axios from "axios";
import moment from "moment";
import printHtml from "html-react-parser";



const useStyles = makeStyles(theme=>({
    root:{
        paddingBottom:200,
    }
}));

export default props=>{
    const classes = useStyles();
    const slug = props.match.params.slug;
    const [blog,setBlogs] = useState({});
    const [loading,setLoading] = useState(true);
    const [content,setContent] = useState('');
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));

    const loadBlogDetails = useCallback(async ()=>{
        const res = await axios.get(url.baseURI+"/blog/"+slug);
        const laravelRes = await axios.get(url.contentUrl+"/api/blog/content/"+res.data.longDescriptionLinkId);


         setBlogs(res.data);
         setContent(laravelRes.data);

        setLoading(false);
    },[])

    useEffect(()=>{
        loadBlogDetails()
    },[loadBlogDetails]);


    if(loading) {
        return (
           <div>Please wait ...</div>
        )
    }
    if(!blog){
        return(
            <div>No Data is found</div>
        )
    }

    return(
        <Grid className={classes.root} container direction={"column"} style={{width:!sm ? "70%" : "95%",margin:'auto'}} alignItems={"center"}>
           <Grid item>
               <br/><br/><br/>
               <Typography variant={"h2"} style={{fontSize:31,fontWeight:700,}}>{blog.title }</Typography>
               <br/><br/>
           </Grid>
            <Grid item>
                <img src={url.contentUrl+"/"+blog.mainImage} style={{width:'100%',}} alt=""/>
                <br/>

            </Grid>
            <br/><br/>
            <Grid item>
                {
                    printHtml(content)
                }
            </Grid>
            <Grid item container direction={sm ? "column" : "row"} alignItems={"center"} style={{marginTop:40}}  align={"center"}>
                <Grid item>
                    <Typography variant={"h4"} style={{color:'#3498db'}}>
                        Published By
                    </Typography>
                </Grid>

               <Grid item style={{marginLeft:!sm ? 20: undefined,}}>
                   <Typography component={"p"}>
                       {
                           blog.publishedByName
                       }
                   </Typography>
               </Grid>

               <Grid item style={{marginLeft:!sm ? 'auto': undefined}}>
                   <Typography style={{color:'red'}}>
                       {
                           moment(blog.publishedAt).format("MMMM Do YYYY")
                       }
                   </Typography>
               </Grid>
            </Grid>


        </Grid>
    )
}
