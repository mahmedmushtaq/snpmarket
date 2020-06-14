import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import theme from "../themes/theme";
import {Home} from "../pages";
import {TopBar} from "../components";
import {Grid} from "@material-ui/core";



function App() {
  return (

    <ThemeProvider theme={theme} >
       <BrowserRouter>
           <TopBar/>
           <div style={{width:"90%",margin:"auto"}}>
           <Switch>
               <Route path={"/"} component={Home}/>
           </Switch>
           </div>
       </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
