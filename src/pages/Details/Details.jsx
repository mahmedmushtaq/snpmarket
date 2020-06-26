import React, {useCallback, useEffect, useState} from "react";
import {Grid, Typography, Button, useMediaQuery} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import printHtml from "html-react-parser";
import axios from "axios";
import url from "../../others/baseUrl";

const useStyles = makeStyles(theme=>({
         itemLargeImg:{
             width:500,
             height:400,
             [theme.breakpoints.down("xs")]:{
                 width: 200,
                 height: 200,
             },
             [theme.breakpoints.down("md")]:{
                 width: 350,
                 height: 250,
             },


         },
       rightDiv:{
           padding:"10px 30px 0 30px",
           width:600,

           [theme.breakpoints.down("md")]:{
               width:400,

           },

           [theme.breakpoints.down("sm")]:{
               width:"90vw",

           },

       },
    imgGallery:{
             width:100,
        height:100,
        [theme.breakpoints.down("xs")]:{
            width: 80,
            height: 80,
        },
    },
    more:{
             margin:'0 30px',



    },
    border:{
        borderTop:'1px solid black',
        width:"100%",
        borderBottom:"1px solid black",
        borderLeft:"none",
        borderRight:"none"
    }

}));
export default props=>{
    const classes = useStyles();
    const slug = props.match.params.slug;
    const [showDescription,setShowDescription] = useState(true);
    const [showMoreInfo,setShowMoreInfo] = useState(false);
    const [loading,setLoading] = useState(true);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const [detail,setDetail] = useState('');
    const [product,setProduct] = useState('');


    const loadSingleData = useCallback(async ()=>{
        const res = await axios.get(url.baseURI+"/product/details/"+slug);
        const productDetailedInfoRes = await axios.get(url.contentUrl+"/api/product/product_detailed_info/"+res.data.longDescriptionLinkId);



        setDetail(productDetailedInfoRes.data);

        setProduct(res.data);
        setLoading(false);

    },[]);

    useEffect(()=>{
        loadSingleData();
    },[loadSingleData]);

    if(loading){
        return <div>Please wait ...</div>
    }else if(!product){
        return <div>404 error occur</div>
    }


    return(
        <Grid container direction={"column"} justify={"center"}  alignItems={"center"} >



            <Grid item >
                <Grid container direction={sm ? "column": 'row'}    justify={"center"} alignItems={"center"}>
                    <Grid item >
                        <img className={classes.itemLargeImg} src={url.contentUrl+"/"+product.mainImage} alt=""/>
                    </Grid>
                    <Grid item   direction={sm ? "column": 'row'}  className={classes.rightDiv}>

                        <Grid container>
                        <Grid item>
                            <Typography variant={"h5"}>{
                                product ? product.title : "..."
                            }</Typography>

                        </Grid>

                        <Grid item>
                            <br/>
                            <Typography component={"p"}>
                                {
                                    product ? product.shortDescription : "..."
                                }

                            </Typography>
                        </Grid>

                        <Grid item>
                            <br/>
                            {
                                !product.link.match("uploads/products/zip") ? (
                                    <Button color={"primary"} component={"a"} href={product.link} variant={"outlined"}>Open url</Button>
                                ):  <Button color={"primary"} component={"a"} href={url.contentUrl+"/"+product.link} variant={"outlined"}>Download it</Button>

                            }

                        </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

            <Grid item style={{marginRight:'auto',marginLeft:20,}}>
                <br/><br/><br/>
                {
                     product.imagesGallery.map((img,i)=>( <img key={i} src={url.contentUrl+"/"+img}  className={classes.imgGallery} alt=""/>))
                }

            </Grid>
            <br/><br/>



            <Grid item className={classes.border} style={{cursor:'pointer',}}>
               <Grid container justify={"center"} >
                    <Grid item className={classes.more}>
                        <Typography variant={"h6"} onClick={()=>{setShowDescription(true);setShowMoreInfo(false);}}>
                            Description
                        </Typography>
                    </Grid>
                   <Grid item className={classes.more}>
                       <Typography variant={"h6"} onClick={()=>{setShowDescription(false);setShowMoreInfo(true);}}>
                           More Info
                       </Typography>
                   </Grid>

               </Grid>
            </Grid>

            {
                showDescription ? (    <Grid item>
                    <br/>
                    <Typography component={"p"} style={{fontSize:18,fontWeight:700,}}>
                        Description
                    </Typography>
                    <br/>
                    <Typography component={"p"}>
                        {
                           printHtml(detail)
                        }
                    </Typography>
                </Grid>) : ""
            }

            {
                showMoreInfo ? (  <Grid item style={{textAlign:'start',marginRight:"auto",padding:20,}}>
                    <br/>
                    <Typography component={"p"} style={{fontSize:18,fontWeight:700,}}>
                        More Info
                    </Typography>
                    <br/>
                    <Typography component={"p"} style={{fontSize:17,fontWeight:500,}}>
                        {
                            product ? product.futherDetails : ""
                        }
                    </Typography>



                </Grid>) : ""
            }




        </Grid>
    )
}
