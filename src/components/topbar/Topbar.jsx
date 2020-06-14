import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import logo from "../../assets/images/logotransparent.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position:'fixed',
        width:'100vw',
    },

    title: {
        flexGrow: 1,
        display: 'none',

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    topbarTitle:{
       margin:"0 15px"
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

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} style={{backgroundColor:'white',color:'black',padding:"10px 0"}}>
                <Toolbar>

                    <img src={logo} width={50} height={50} alt=""/>

                    <Typography className={classes.title} variant="h6" noWrap style={{fontWeight:800,}}>
                        martsnp
                    </Typography>
                    <Typography className={classes.topbarTitle}>
                       About
                    </Typography>
                    <Typography className={classes.topbarTitle}>
                        Progress
                    </Typography>
                    <Typography className={classes.topbarTitle}>
                        Resources
                    </Typography>
                    <Typography className={classes.topbarTitle}>
                        Blog
                    </Typography>


                    <Typography className={classes.topbarTitle}>
                        Contact
                    </Typography>





                </Toolbar>
            </AppBar>
        </div>
    );
}

