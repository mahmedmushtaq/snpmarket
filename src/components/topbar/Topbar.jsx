import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import {Link} from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import ContactsIcon from '@material-ui/icons/Contacts';
import CodeIcon from '@material-ui/icons/Code';
import AssignmentIcon from '@material-ui/icons/Assignment';

import logo from "../../assets/images/logotransparent.png";
import {Hidden,Grid,List,ListItem,ListItemIcon,ListItemText,SwipeableDrawer,Typography,Toolbar} from "@material-ui/core";
import "../../index.css";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position:'fixed',
        width:'100%',
        backgroundColor:'white',
        top:0,



    },
    link:{
      textDecoration:'none'
    },

    title: {
        flexGrow: 1,
        cursor:'pointer'



    },
    topbarTitle:{
       margin:"0 15px",
        cursor:'pointer',

    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const menuList = [
    {id:1,name:'Home', to:'/',icon:<HomeIcon/>},
    {id:2,name:'About', to:'/about',icon:<HelpIcon/>},
    {id:3,name:'Developing', to:'/developing',icon:<CodeIcon/>},
    {id:4,name:'Blog', to:'/blog',icon:<AssignmentIcon/>},
    {id:5,name:'Contact', to:'/contact',icon:<ContactsIcon/>},
]

const MenuOptions = props=>{
    const {direction,classes} = props;
    return(
        (
            <Grid container direction={direction} justify={"flex-end"} >
                {
                    menuList.map(item=>(
                        <Grid item key={item.id}>
                            <Typography component={Link} to={item.to} className={classes.topbarTitle}>
                                {
                                    item.name
                                }
                            </Typography>
                        </Grid>
                    ))
                }



            </Grid>
        )
    )
}

export default function SearchAppBar() {
    const classes = useStyles();
    const [open,setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} style={{backgroundColor:'white',color:'black',padding:"10px 0"}}>
                <Toolbar>



                  <Grid container alignItems={"center"} className={"no-decoration"} component={Link} to={"/"}>
                      <Grid item>
                      <img src={logo} width={50} height={50} alt=""/>
                      </Grid>
                      <Grid item>
                          <Typography className={classes.title}  variant="h6">
                              martsnp
                          </Typography>
                      </Grid>
                  </Grid>

                    <Hidden smDown>


                     <MenuOptions direction={"row"} classes={classes}/>


                    </Hidden>

                    <Hidden mdUp>



                           <MenuIcon style={{marginRight:30,}} onClick={()=>setOpen(true)}/>
                           <SwipeableDrawer
                           anchor={"top"}
                           open={open}
                           onClose={()=>setOpen(false)}
                           >

                               <List>
                                   {menuList.map((text, index) => (
                                       <ListItem component={Link} to={text.to} button key={text.id}>
                                           <ListItemIcon>{text.icon}</ListItemIcon>
                                           <ListItemText primary={text.name} />
                                       </ListItem>
                                   ))}
                               </List>

                           </SwipeableDrawer>


                    </Hidden>




                </Toolbar>
            </AppBar>
        </div>
    );
}

