import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import theme from "../themes/theme";
import {About, Contact, Blog, Details, Developing, Home, BlogDetails} from "../pages";
import {TopBar} from "../components";
import {Grid, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core";


function App() {
    const materialUiTheme = useTheme();
    const xs = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  return (

    <ThemeProvider theme={theme}>
       <BrowserRouter>
           <TopBar/>
           <br/><br/><br/><br/><br/><br/>
           <div style={{width:!xs ? "90%":undefined,textAlign:xs?"center":undefined,margin:"auto "}}>
           <Switch>
               <Route exact path={"/blog-details"} component={BlogDetails}/>
               <Route  path={"/item-details/:id"} component={Details}/>
               <Route exact path={"/about"} component={About}/>
               <Route exact path={"/contact"} component={Contact}/>
               <Route exact path={"/blog"} component={Blog}/>
               <Route exact path={"/developing"} component={Developing}/>
               <Route path={"/"} component={Home}/>
           </Switch>
           </div>
       </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
