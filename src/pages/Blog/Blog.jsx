import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";
import {loadBlogs} from "../../store/actions/blogs";
import {BlogItem} from "../../components";







export default props=>{


    const dispatch = useDispatch();
    const {blogsList,blogsLoading} = useSelector(store=>store.blogs);
    const [page,setPage] = useState(0);
    const [pageLoadingMsg,setPageLoadingMsg] = useState("");

    const loadMore = async ()=>{
        setPageLoadingMsg("Please wait...");
        await dispatch(loadBlogs(page));
        setPageLoadingMsg("");
        setPage(page=>(page+1))
    }


    const loadBlogList = useCallback(async ()=>{
        if(blogsList.length === 0){
            await dispatch(loadBlogs());
            setPage(page=>(page+1));
        }
    },[dispatch])


    useEffect(()=>{
        loadBlogList();
    },[loadBlogList])

    return(
        <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
            <Grid item>
                <Typography variant={"h2"}>Blogs</Typography>
                <br/><br/> <br/><br/>
            </Grid>

            {/* =============== first part ==================== */}

            {
                blogsLoading ? "please wait ..." : blogsList.length === 0 ? "No blog is found" :  blogsList.map(blog=>(
                   <BlogItem key={blog._id} blog={blog}/>
               ))
            }


            <Grid item style={{margin:"30px auto"}}>
                <Button variant={"contained"} color={"primary"} onClick={loadMore} >Load More</Button>
                {
                    pageLoadingMsg ? pageLoadingMsg : ""
                }
            </Grid>




        </Grid>
    )
}
