import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import SelectedCourses from "../Courses/SelectedCourses";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
  },
  background_img: {
    zIndex: -100,
    position: "absolute",
    height: "90%",
    top: 70,
    marginLeft: -24,
    opacity: 0.3,
  },
  ellipse: {
    zIndex: -100,
    position: "absolute",
    height: "83%",
    // top: 70,
    marginLeft: "-125px",
    marginTop: "120px",
    opacity: 0.3,
  },
}));

export default function FirstSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <img
        className={classes.ellipse}
        src="/static/frontend/assets/Ellipse.png"
        alt=""
      />
      <img
        className={classes.background_img}
        src="/static/frontend/assets/firstSectionBg.png"
        alt=""
      /> */}

      <SelectedCourses />
      {/* <Grid item className={classes.text}>
          <div className={classes.en}>
            <Typography className={classes.title} variant="h4">
              Minerva
            </Typography>
            <Typography className={classes.describtion} variant="subtitle1">
              " in Roman religion, the goddess of handicrafts, the professions,
              the arts, and, later, war. she was commonly identified with the
              Greek Athena. "
            </Typography>
          </div>
          <div className={classes.fa}>
            <Typography className={classes.title} variant="h4">
              مینروا
            </Typography>
            <Typography className={classes.describtion_fa} variant="subtitle1">
              در آئیین روم، الهه ی کاردستی حرفه ها، هنر، و بعد ها جنگ. معمولا او
              را با آتنای یونان شناسایی می کنند.
            </Typography>
          </div>
        </Grid> */}
    </div>
  );
}
