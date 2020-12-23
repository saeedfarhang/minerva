import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import SelectedCourses from "../Courses/SelectedCourses";
import FirstSection from "./FirstSection";
import AllCourses from "../Courses/AllCourses";

var drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    marginLeft: 73,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  devider: {
    height: 100,
  },
}));

export default function App(props) {
  const history = useHistory();

  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  const classes = useStyles();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      <div>
        <FirstSection />
        <div className={classes.devider} />
        <AllCourses />
      </div>
    </main>
  );
}
