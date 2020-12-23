import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Button from "../CustomComponents/Button";
import CourseCard from "./CourseCard";

const useStyles = makeStyles((theme) => ({
  root: { marginLeft: theme.spacing(5), marginRight: theme.spacing(5) },
  selected_courses: {},

  title: {},
  titleText: {
    fontWeight: "bold",
  },
  btn: {},
  divider: {
    height: 10,
    width: "20px",
    backgroundColor: theme.palette.secondary.main,
  },
  courses: {
    marginTop: 10,
    justifyContent: "center",
  },
  cardGrid: {
    // [theme.breakpoints.up("lg")]: {
    //   width: 300,
    //   minWidth: 300,
    // },
    [theme.breakpoints.down("lg")]: {
      width: 320,
      minWidth: 300,
    },
    [theme.breakpoints.down("md")]: {
      width: 360,
      minWidth: 300,
    },
    [theme.breakpoints.down("sm")]: {
      width: 400,
      minWidth: 300,
    },
    width: 350,
  },
}));

export default function CourseList(props) {
  const classes = useStyles();

  const { courseList, setCourseList } = props;

  return (
    <>
      {courseList ? (
        <>
          <Grid
            container
            justify="center"
            alignItems="center"
            item
            className={classes.title}
          >
            <Grid item style={{ flexGrow: 1 }}>
              <Typography className={classes.titleText} variant="h5">
                {props.title}
              </Typography>
              <div className={classes.divider} />
            </Grid>

            <Grid item>
              <Button
                color={"secondary"}
                endIcon={<ArrowBack fontSize="small" />}
                text={props.expandButton}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.courses}>
            {courseList.map((item) => (
              <Grid className={classes.cardGrid} item key={item.id}>
                <CourseCard
                  course_id={item.id}
                  title={item.title}
                  description={item.description}
                  master={item.master}
                  thumbnail={item.thumbnail}
                  price={item.price}
                  category={item.category}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </>
  );
}
