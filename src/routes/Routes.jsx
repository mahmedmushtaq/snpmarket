import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Switch,Redirect, Route, BrowserRouter} from "react-router-dom";
import theme from "../themes/theme";
import {About,
    Contact, Blog,
    Details, Developing,
    Home, BlogDetails,
    Login,AddNewProduct,
    AddNewBlog
} from "../pages";
import {AdminHome, TopBar} from "../components";
import {Grid, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core";
import {useSelector} from "react-redux";
import AddNewProudct from "../pages/AddNewProduct";


function App() {
    const materialUiTheme = useTheme();
    const xs = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
    const token = useSelector(store=>store.user.token);
  return (

    <ThemeProvider theme={theme}>
       <BrowserRouter>
           <TopBar/>
           <br/><br/><br/><br/><br/><br/>
           <div style={{width:!xs ? "90%":undefined,textAlign:xs?"center":undefined,margin:"auto "}}>
           <Switch>

               <Route exact path={"/item/:slug"} component={Details}/>
               <Route exact path={"/about"} component={About}/>
               <Route exact path={"/contact"} component={Contact}/>
               <Route exact path={"/blog"} component={Blog}/>
               <Route exact path={"/developing"} component={Developing}/>
               <Route exact path={"/admin/login"} render={(props)=><Login {...props}/>}/>
               <Route exact path={"/:slug"} component={BlogDetails}/>

               <Route exact path={"/admin/PPtOZUqsAnwWadvGmNAw/new-blog"} render={(props)=>{
                  if(!token) return <Redirect to={"/"}/>
                   return <AddNewBlog {...props}/>
               }}/>

               <Route exact path={"/admin/PPtOZUqsAnwWadvGmNAw/new-blog/:slug"} render={(props)=>{
                   if(!token) return <Redirect to={"/"}/>
                   return <AddNewBlog {...props}/>
               }}/>

               <Route exact path={"/admin/VTStzKzBcgsICKswVxyG/new-product"} render={(props)=>{
                    if(!token) return <Redirect to={"/"}/>
                   return <AddNewProudct {...props}/>
               }}/>

               <Route exact path={"/admin/VTStzKzBcgsICKswVxyG/new-product/:slug"} render={(props)=>{
                    if(!token ) return <Redirect to={"/"}/>
                   return <AddNewProudct {...props}/>
               }}/>

               <Route exact path={"/admin/home"} render={()=>{
                    if(!token) return <Redirect to={"/"}/>
                   return <AdminHome/>
               }}/>
               <Route path={"/"} component={Home}/>
           </Switch>
           </div>
       </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
