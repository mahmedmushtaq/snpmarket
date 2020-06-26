import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export default props=>{
    const token = useSelector(store=>store.user.token);
    if(!token){
        <Redirect to={"/"}/>
    }
    return(
        <div>

        </div>
    )
}
