import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Book, Eco, Edit, MusicNote, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../CustomComponents/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { axiosInstance } from "../../Axios";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0 0 25px 25px",
    // padding: 2,
  },
  media: {
    height: 170,
    padding: 5,
  },
  info: { flexGrow: 1 },
  counter: {
    direction: "rtl",
    paddingRight: 10,
  },

  divider: {
    width: 5,
  },
  category_paper: {
    width: "fit-content",
    borderRadius: 0,
    padding: 2,
    backgroundColor: "rgba(0 0 0 / 50%)",
    width: "30px",
    justifyContent: "center",
    alignItems: "center",
    transition: theme.transitions.create(["category_paper", "width"], {
      duration: theme.transitions.duration.complex,
    }),
    "&:hover": {
      width: "100%",
    },
  },

  category_paper_text: {
    fontSize: 12,
    fontWeight: 900,
    color: "#fff",
  },
  category_paper_icon: {
    fontSize: 14,
    color: "#fff",
  },
}));

function CategoryIcon(cat_id) {
  switch (cat_id) {
    case 1:
      return <MusicNote />;
    case 2:
      return <Book />;
    case 3:
      return <Edit />;
    default:
      return <Eco />;
  }
}

export default function CourseCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (course_id) => {
    history.push(`/courses/${course_id}`);
  };

  const [cat, setCat] = useState({ id: 0, title: "" });
  const [master, setMaster] = useState({ id: 0, name: "", avatar: "" });

  useEffect(() => {
    axiosInstance
      .get(`category/${props.category}/`)
      .then((res) => setCat(res.data.category));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`accounts/getUsers/${props.master}/`)
      .then((res) => setMaster(res.data));
  }, []);

  const [cat_expand, setCatExpand] = useState(false);

  const catExpand = (state) => {
    setCatExpand(state);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => handleClick(props.course_id)}
        onMouseOver={() => catExpand(true)}
        onMouseLeave={() => catExpand(false)}
      >
        <CardMedia
          className={classes.media}
          image={props.thumbnail}
          title="Contemplative Reptile"
        >
          <Grid
            className={classes.category_grid}
            container
            item
            justifyContent="center"
            alignItems="center"
          >
            <Collapse in={cat_expand}>
              <Typography className={classes.category_paper_icon}>
                {CategoryIcon(cat.id)}
              </Typography>
              <Paper className={classes.category_paper}>
                <Typography
                  noWrap
                  className={classes.category_paper_text}
                  variant="h3"
                >
                  {cat.title}
                </Typography>
              </Paper>
            </Collapse>
          </Grid>
        </CardMedia>
        <CardContent style={{ padding: "7px 16px" }}>
          <Typography noWrap gutterBottom variant="h6">
            {props.title}
          </Typography>
          <Typography noWrap variant="body1" color="textSecondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Grid
          container
          //   justify="center"
          alignItems="center"
          className={classes.info}
          spacing={1}
        >
          <Grid item>
            <Avatar alt={master.name} src={master.avatar}></Avatar>
          </Grid>
          <Typography variant="body2">{master && master.name}</Typography>
        </Grid>

        <Grid
          container
          direction="column"
          className={classes.counter}
          spacing={2}
        >
          <Grid container item alignItems="center" spacing={2}>
            <MonetizationOnIcon fontSize="small" />
            <span className={classes.divider} />

            <Typography variant="subtitle2">{props.price}</Typography>
          </Grid>
          <Grid container item alignItems="center" spacing={2}>
            <Person fontSize="small" />
            <span className={classes.divider} />
            <Typography variant="subtitle2">2000</Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
