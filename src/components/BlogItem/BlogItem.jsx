import React from "react";
import {Button, Divider, Grid, Typography, useMediaQuery} from "@material-ui/core";
import {Link} from "react-router-dom";
import moment from "moment";
import {makeStyles, useTheme} from "@material-ui/styles";
import EditIcon from '@material-ui/icons/Edit';
import {useSelector} from "react-redux";
import url from "../../others/baseUrl";

const useStyles = makeStyles(theme=>({
    blogMainImg:{
        width:150,
        height:150,
        [theme.breakpoints.down("xs")]:{
            width:"90vw",
            height:250,
        }
    },
    shortDes:{
        width:"70%",
        marginLeft:25,padding:"5px 20px",
        [theme.breakpoints.down("xs")]:{
            width:"90vw",
            margin:0,
            padding:0

        }

    }
}));


export default props=>{
    const {blog} = props;
    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const {user} = useSelector(store=>store.user);
    const authority = user.authority ? user.authority : "auth_required";

    return(
        <React.Fragment s>

            <Divider orientation={"horizontal"} style={{width:'100%',height:1}}/>
            <br/><br/>

            <Grid item container  direction={xs ? "column" : "row"} justify={xs ? "center" : undefined} alignItems={xs ? "center" : undefined}>
                <Grid item>

                    <img src={url.contentUrl+"/"+blog.mainImage} className={classes.blogMainImg}/>
                </Grid>
                <Grid item className={classes.shortDes} style={{}}>
                    <Typography variant={"h5"} style={{}}>{blog.title}</Typography>
                    <br/>
                    <Typography component={"p"}>
                        {
                            blog.shortDescription
                        }
                    </Typography>
                    <br/>

                    <Button  color={"primary"} component={Link} to={"/"+blog.slug} style={{color:'red'}}>Read More</Button>


                    {
                        authority === 'admin' ? (<Button  color={"primary"} component={Link} to={"/admin/PPtOZUqsAnwWadvGmNAw/new-blog/"+blog.slug} style={{color:'red'}}><EditIcon/></Button>
                        ): ""
                    }

                </Grid>
                <Grid item style={{marginTop:10,}}>
                    <Typography component={"p"}>{
                        moment(blog.publishedAt).format("MMMM Do YYYY")
                    }</Typography>
                </Grid>


            </Grid>

            <br/><br/>
        </React.Fragment>
    )
}
