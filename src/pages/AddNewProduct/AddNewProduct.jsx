import React, {useCallback, useEffect, useState} from "react";
import {Grid,Typography,FormControlLabel,Input,FormControl,
    InputLabel,MenuItem,Select,Switch,TextField,Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ReactQuill from "react-quill";
import formData from "form-data";
import url from "../../others/baseUrl";
import axios from "axios";
import keys from "../../others/keys";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme=>({
     item:{
         marginBottom:40,
         width:"100%",
     },
    small:{
         fontSize:12,
    },
    root:{
         width:'70%',
        margin:'0 auto'
    },
    imagesGallery:{
         margin:10,
    }

}));

const initialState = {
    title:'',
    file_link:'',
    status:'',
}
export default props=>{
    const classes = useStyles();
    const [mainImg,setMainImg] = useState();
    const [mainImgLink,setMainImgLink] = useState();
    const [multipleImagesLink,setMultipleImagesLink] = useState();
    const [multipleImages,setMultipleImages] = useState([]);
    const [shortDescription,setShortDescription] = useState('');
    const [longDescription,setLongDescription] = useState('');
    const [downloadAble,setDownloadAble] = useState(false);
    const [productFile,setProductFile] = useState('');
    const [laravelRes,setLaravelRes]  = useState("");
    const [specificProduct,setSpecificProduct] = useState("");



   const [values,setValues] = useState({
       ...initialState
   })

    const {user,token} = useSelector(store=>store.user);
    const authority = user.authority ? user.authority : 'auth_required';
    const userId = user._id ? user._id : "345kd";

   const loadSpecificProduct = useCallback(async ()=>{
       const slug = props.match.params.slug;
       if(slug){
           const res = await axios.get(url.baseURI+"/product/details/"+slug);
           const lrvRes = await axios.get(url.contentUrl+"/api/product/"+res.data.longDescriptionLinkId);
           setSpecificProduct(res.data);
           setLaravelRes(lrvRes.data);
           setValues({
               title:res.data.title,
               status:res.data.status,
               file_link:res.data.link,

           })

           setShortDescription(res.data.shortDescription);
           setLongDescription(lrvRes.data.product_detailed_info);
           setMainImgLink(res.data.mainImage);
           setMultipleImagesLink(res.data.imagesGallery);
           setDownloadAble(res.data.download);




       }
   },[])

    useEffect(()=>{
        loadSpecificProduct();
    },[loadSpecificProduct]);





    const handleProductFile = e=>{
        setProductFile(e.target.files[0]);
    }

    const handleImageChange = e=>{
        setMainImg(e.target.files[0]);
    }

    const handleMultipleImages = e=>{

        setMultipleImages(e.target.files);
    }

    const handleChange = e=>{
       setValues({
           ...values,
           [e.target.name]:e.target.value,
       })
    }

    const onSubmitForm = async e=>{
       e.preventDefault();

       const formData = new FormData();
       formData.append("main_img",mainImg);


       if(mainImg !== "" && longDescription !== "" && token !== "" && shortDescription !== "" && values.title !== "" && values.status !== "") {

           for (let i = 0; i < multipleImages.length; i++) {
               formData.append("multiple_images" + i, multipleImages[i]);
           }

           formData.append("product_file", productFile);

           formData.append("longDescription", longDescription);
           formData.append("secret_key", keys.secretReq);

           if(!laravelRes) {

               const res = await axios.post(url.contentUrl + "/api/product", formData);
               setLaravelRes(res.data);
               sendData(res.data);
           }else{
               sendData(laravelRes);
           }





       }else{
           alert("Main Image Is Required");
       }



    }

    const sendData = async data=>{
        console.log("token is = ",token);
        try {
            const res = await axios.post(url.baseURI + "/product/add", {
                title: values.title,
                mainImg: data.main_image,
                imagesGallery: data.images_gallery,
                downloadAble,
                fileLink: downloadAble ? data.product_file_link : values.file_link,
                shortDescription,
                longDescriptionLinkId: data.id,
                productBy: user._id,
                status: values.status,
            },{
                headers:{
                    accept :'application/json',
                    Authorization :'Bearer '+token,
                }
            })


            alert(res.data.message);

        }catch(err){
            console.log("err = ",err);
            alert("err occur ",err);
        }


    }

    const deleteProduct = async ()=>{
       const mysqlId = parseInt(specificProduct.longDescriptionLinkId);
       await axios.delete(url.baseURI+"/product/delete/"+specificProduct._id);
       await axios.delete(url.contentUrl+"/api/product/"+mysqlId);

    }

    const updateProduct = async ()=>{
        const formData = new FormData();
        formData.append("secret_key",keys.secretReq);
        formData.append("product_detailed_info",longDescription);
        if(multipleImages){
            for (let i = 0; i < multipleImages.length; i++) {
                formData.append("multiple_images" + i, multipleImages[i]);
            }
        }
        if(mainImg){
            formData.append("main_image",mainImg);
        }
        if(productFile){
            formData.append("product_file",productFile);
        }

        const lrvRes = await axios.post(url.contentUrl+"/api/product/update/"+laravelRes.id,formData);
        console.log("main image is = ",lrvRes.data.main_image);
        const nodeRes = await axios.put(url.baseURI+"/product/"+specificProduct._id,{
             title:values.title,
             status:values.status,
             mainImg:lrvRes.data.main_image,
             shortDescription,
             fileLink:!lrvRes.data.product_file_link ? values.file_link :lrvRes.data.product_file_link ,
             imagesGallery:lrvRes.data.images_gallery,
             downloadAble,

        });

        alert("Product Updated Successfully");



    }

    return(
        <form method={"post"} onSubmit={onSubmitForm} encType="multipart/form-data">
        <Grid container className={classes.root} justify={"center"} direction={"column"} alignItems={"center"}>
            <Grid item className={classes.item}>
                <Typography variant={"h2"}>Add New Product</Typography>
            </Grid>
            <br/><br/>

            <Grid item className={classes.item}>
                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select Product Status either developing or developed</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={"status"}
                        value={values.status}
                        onChange={handleChange}
                    >
                        <MenuItem value={'developing'}>Developing</MenuItem>
                        <MenuItem value={'developed'}>Developed</MenuItem>

                    </Select>
                </FormControl>
            </Grid>

            <Grid item className={classes.item}>
                <Typography variant={"h6"}>Select Main Image of the product</Typography>
                <br/>
                <input  accept={"image/*"} name={"image"}  type={"file"} onChange={handleImageChange}/>
            </Grid>

            <Grid item className={classes.item}>
                <Typography variant={"h6"}>Select multiple images <span className={classes.small}>Not necessary</span></Typography>
                <br/>
                <input accept={"image/*"} name={"multipleImages"} type={"file"} onChange={handleMultipleImages} multiple/>
            </Grid>

            <Grid item className={classes.item}>
                <TextField fullWidth name={"title"} value={values.title} onChange={handleChange} placeholder={"Title(max 65 characters)"} />
                <div>{values.title.length}</div>
            </Grid>


            <Grid item className={classes.item}>
               <TextField fullWidth rows={4} multiline placeholder={"Short Description (max 255 characters)"} name={"shortDescription"}  value={shortDescription} onChange={e=>setShortDescription(e.target.value)}/>
               <div>{shortDescription.length}</div>
            </Grid>


            <Grid item className={classes.item}>
                <FormControlLabel
                control={<Switch
                    checked={downloadAble}
                    onChange={e=>setDownloadAble(e.target.checked)}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}

                />}
                label={"Set Downloaded File Link Or Upload File As A Zip"}
                />
            </Grid>

            {
                downloadAble ? (
                    <Grid item className={classes.item}>
                        <Typography variant={"h6"}>Upload product File Zip</Typography>
                        <br/>
                        <input  accept=".zip,.rar,.7zip" name={"image"} type={"file"} onChange={handleProductFile}/>
                    </Grid>


                ): (  <Grid item className={classes.item}>
                    <TextField fullWidth name={"file_link"} value={values.file_link}  onChange={handleChange} placeholder={"File Link"} />
                </Grid>)
            }


            <Grid item className={classes.item}>
                <ReactQuill value={longDescription}
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
                            placeholder={"Detailed Info"}
                            onChange={value=>setLongDescription(value)} />
            </Grid>

            <Grid item className={classes.item}>
                {
                    !specificProduct ? (
                        <Button type={"submit"} variant={"contained"} color={"secondary"}>Add Product</Button>
                    ): (
                        <Button onClick={updateProduct} variant={"outlined"}  color={"secondary"}>Update Product</Button>
                    )
                }
            </Grid>



            {
                specificProduct ? (
                    specificProduct.publishedBy === user._id || user.authority === 'admin' ? ( <Grid item>

                    <Button variant={"outlined"} onClick={deleteProduct}>Delete Product</Button>

                </Grid>): ""

                ): ""
            }

            {
                mainImgLink ? (
                    <Grid item>
                        <br/><br/>
                        <Typography variant={"h5"}>Main Image is</Typography>
                        <img src={url.contentUrl+"/"+mainImgLink} width={100} height={100} alt=""/>
                    </Grid>
                ): ""
            }


            {
                multipleImagesLink ? (
                    <Grid item>
                        <Typography variant={"h5"}>Images Gallery</Typography>
                        {
                            multipleImagesLink.map(img=>(
                                <img className={classes.imagesGallery} src={url.contentUrl+"/"+img} width={50} height={50} alt=""/>
                            ))
                        }


                    </Grid>
                ): ""
            }


        </Grid>
        </form>
    )
}
