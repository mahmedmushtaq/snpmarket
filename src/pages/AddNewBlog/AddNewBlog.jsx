import React, {useCallback, useEffect, useRef, useState} from "react";
import {Grid,Button, Typography, TextField, useMediaQuery} from "@material-ui/core";

import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormData from "form-data";
import {useTheme} from "@material-ui/styles";
import axios from "axios";

import url from "../../others/baseUrl";

import {useSelector} from "react-redux";
import keys from "../../others/keys";







const initialValue = {
    seoTitle:'',
    simpleTitle:'',
    shortDescription:'',
    tags:'',
    category:"",
}

export default props=>{
    const [loadSpecificBlog,setSpecificBlog] = useState('');
    const [alreadyUploadedImage,setAlreadyUploadedImage] = useState('');
    const [resOfLaravel,setResOfLaravel] = useState('');


    const theme = useTheme();

    const [currentState, onChangeCurrentState] = useState('')
    const {token,user} = useSelector(store=>store.user);
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const [image,setImage] = useState();



    const [value,setValue] = useState({
     ...initialValue,

    })


    const deleteBlog = async ()=>{
        const res = await axios.delete(url.baseURI+"/blog/"+loadSpecificBlog._id,{
            headers:{
                authorization: 'Bearer '+token,
            }
        });
        const resDeleteFromLaravel  =await
            axios.delete(url.contentUrl+"/api/blog/"+parseInt(loadSpecificBlog.longDescriptionLinkId));
        alert("Blog Deleted Successfully");

    }



    const loadBlogSpecific = useCallback(async ()=>{

        const slug = props.match.params.slug;
        if(slug){
            const res = await axios.get(url.baseURI+"/blog/"+slug);
            const loadContentData = await axios.get(url.contentUrl+"/api/blog/"+parseInt(res.data.longDescriptionLinkId));
            setSpecificBlog(res.data);
            setResOfLaravel(loadContentData.data);
           setValue({
               ...value,
               seoTitle:res.data.seoTitle,
               simpleTitle:res.data.title,
               shortDescription:res.data.shortDescription ,
               tags:res.data.tags,
               category: res.data.category,

           })
            onChangeCurrentState(loadContentData.data.content);
           setAlreadyUploadedImage(loadContentData.data.main_image);


        }

    },[]);

    useEffect(()=>{
        loadBlogSpecific();
    },[loadBlogSpecific]);


    const onChange = e=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value,
        })
    }

    const handleImageChange  = e=>{

        setImage(e.target.files[0]);
    }






    const onSubmitForm = async  e=>{
        e.preventDefault();

        if(currentState !== "" && image !== "" ) {

            const formData = new FormData();

            formData.append("image", image);
            formData.append("content_data", currentState);
            formData.append("posted_by", user._id);
            formData.append("secret_key",keys.secretReq);

            if(!resOfLaravel){
                const res = await axios.post(url.contentUrl + "/api/blog",formData);
                setResOfLaravel(res.data);
                sendData(res.data)
            }else {
                sendData(resOfLaravel);

            }





        }else{
            console.log("please make sure you are login ",currentState," image = ",image," token = ",token);
        }



    }





    const sendData = async (responseData)=>{
        try {
            const res = await axios.post(url.baseURI + "/blog/add", {
                title: value.simpleTitle,
                seoTitle: value.seoTitle,
                mainImage: responseData.main_image,
                tags: value.tags,
                category: value.category,
                shortDescription: value.shortDescription,
                longDescriptionLinkId: responseData.id,
                postedBy: user._id,
            },{
               headers:{
                   Authorization:'Bearer '+token,
               }
            });

            alert(res.data.message);
            // setResOfLaravel("");
            // setImage("");
            // onChangeCurrentState("");
            // setValue(initialValue)
        }catch(err){
            alert("This title already in use, furthermore error is = ",err);
        }

    }



    const updateForm = async (e)=>{
        e.preventDefault();
        console.log("update From");
        const formData = new FormData();
        formData.append('contentData',currentState);
        formData.append("secret_key",keys.secretReq);
        if(image){
              formData.append("image",image);
        }
        const uploadDataRes = await axios.post(url.contentUrl+"/api/blog/update/"+resOfLaravel.id,formData);

        const res = await axios.put(url.baseURI +"/blog/"+loadSpecificBlog._id,{
            ...value,
            mainImage:uploadDataRes.data.main_image,
        },{
            headers:{
                authorization:"Bearer "+token
            }
        })
        alert(res.data.message);
    }

    return(
        <form method={"post"} onSubmit={loadSpecificBlog ? updateForm : onSubmitForm} encType="multipart/form-data">
        <Grid container style={{width:sm ? "90%" : "70%",margin:'auto'}} direction={"column"} justify={"center"} alignItems={"center"}>

            <Grid item style={{marginBottom:100,}}>
                <Typography variant={"h5"}>Add New Blogs</Typography>
            </Grid>

            <Grid item  style={{marginBottom:30,width:'100%'}}>
                <TextField fullWidth name={'seoTitle'} value={value.seoTitle} onChange={onChange} placeholder={"Seo title(max 65)"} />
                <b>{value.seoTitle.length}</b>
            </Grid>

            <Grid item style={{marginBottom:30,width:'100%'}}>
                <TextField name={'simpleTitle'} fullWidth value={value.simpleTitle} onChange={onChange} placeholder={"Simple title(max 65)"} />
                <b>{value.simpleTitle.length}</b>
            </Grid>

            <Grid item style={{marginBottom:30,width:'100%'}}>
                <TextField fullWidth name={'shortDescription'} value={value.shortDescription} onChange={onChange} placeholder={"meta description(max 155)"} />
                <b>{value.shortDescription.length}</b>
            </Grid>

            <Grid item style={{marginBottom:30,width:'100%'}}>
                <TextField fullWidth name={'tags'} value={value.tags} onChange={onChange} placeholder={"Enter tags with commo separated like (test,sports)"} />
            </Grid>





            <Grid item style={{marginBottom:30,width:'100%'}}>
                <TextField fullWidth name={'category'} value={value.category} onChange={onChange} placeholder={"Enter category with commo separated like (programming,business)"} />

            </Grid>


            <Grid item>
                <ReactQuill value={currentState}

                            modules={{
                                toolbar:[
                                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                    ['blockquote', 'code-block'],

                                                 // custom button values
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                                    [{ 'direction': 'rtl' }],                         // text direction

                                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                    [ 'link', 'video', 'formula' ],          // add's image support
                                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                                    [{ 'font': [] }],
                                    [{ 'align': [] }],

                                    ['clean'] ,
                                    ['image']


                                ],

                            }}

                            onChange={value=>onChangeCurrentState(value)} />






            </Grid>
            <br/><br/>

            <Grid item>
                {/*<Editor/>*/}
            </Grid>
            <Grid item style={{marginBottom:10,width:'100%'}}>
                <Typography variant={"h5"}>Select them main image of the blog</Typography>
            </Grid>

            {
                alreadyUploadedImage ? (
                    <Grid item>
                        <br/><br/>
                        <img src={url.contentUrl+"/"+alreadyUploadedImage} width={200} height={200} alt=""/>
                    </Grid>
                ): ""
            }


           <br/><br/>


            <Grid item style={{marginBottom:40,}}>
                <input accept={"image/*"} name={"image"} type={"file"} onChange={handleImageChange}/>
            </Grid>







            <Grid item>

                {
                    loadSpecificBlog.publishedBy === user._id ?(
                        <Button type={"submit"}  variant={"contained"} color={"primary"} >Update Product</Button>
                    ):(
                    <Button type={"submit"} variant={"contained"} color={"primary"}>Add New Blog</Button>
                    )
                }

            </Grid>

            <br/><br/>




            <br/><br/>

            {
                loadSpecificBlog ? (
                    loadSpecificBlog.publishedBy === user._id || user.authority === 'admin' ? (
                    <Grid item>
                        <Button type={"submit"} variant={"contained"} onClick={deleteBlog} >Delete</Button>

                    </Grid>
                ): ""
                ): ""
            }







            <br/><br/><br/><br/>    <br/><br/><br/><br/>    <br/><br/><br/><br/>    <br/><br/><br/><br/>

        </Grid>
        </form>
    )
}
