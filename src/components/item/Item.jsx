import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Link} from "react-router-dom";
import ShareIcon from '@material-ui/icons/Share';
import Button from "@material-ui/core/Button";
import test1  from "../../assets/images/test1.png";
import EditIcon from '@material-ui/icons/Edit';
import {useSelector} from "react-redux";
import url from "../../others/baseUrl";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin:10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ProductItem(props) {
    const classes = useStyles();
    const {product} = props;
    const {user} = useSelector(store=>store.user);
    const authority = user.authority ? user.authority : "auth_required";


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      M
                    </Avatar>
                }

                title={!product.profileName ? "M Ahmed Mushtaq" : product.profileName}
                subheader={product.developedAt ? "developing" : undefined}
            />
            <CardMedia
                className={classes.media}
                image={url.contentUrl+"/"+product.mainImage}
                title="Product main"
            />
            <CardContent>
                <Typography variant={"h2"} style={{fontSize:18,fontWeight:800,color:'black'}}>
                    {
                        product.title.length > 30 ? product.title.substr(0,30)+"..." : product.title
                    }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        product.shortDescription
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <IconButton aria-label="share">
                    <ShareIcon />

                </IconButton>

                {
                    authority === 'admin' ? (
                        <IconButton component={Link} to={"/admin/VTStzKzBcgsICKswVxyG/new-product/"+product.slug} aria-label={"edit"}>
                            <EditIcon />
                        </IconButton>
                    ):""
                }


                <Button component={Link} to={"/item/"+product.slug}>Open</Button>
            </CardActions>

        </Card>
    );
}
