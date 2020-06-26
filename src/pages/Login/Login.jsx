import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import {Typography,TextField,Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/actions/user";

export default props=>{
    const [value,setValue] = useState({
        email:'',
        password:'',
    })

    const dispatch = useDispatch();

    const handleChange = e=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value,
        })
    }

    const login = async  ()=>{
      const response = await  dispatch(addUser(value));
       props.history.push("/admin/home");
    }
    return(
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid item>
                <Typography variant={"h5"}>Admin Login</Typography>
            </Grid>
            <br/><br/>
            <Grid item>
                <TextField name={"email"} value={value.email} onChange={handleChange} placeholder={"Email"}/>
            </Grid>
            <br/><br/>
            <Grid item>
                <TextField name={"password"} type={"password"} value={value.password} onChange={handleChange} placeholder={"Password"}/>
            </Grid>
            <br/>
            <Grid item>
                <Button variant={"contained"} onClick={login} color={"secondary"}>Login</Button>
            </Grid>

        </Grid>

    )
}
