import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Button from "../CustomComponents/Button";
import { ArrowBack } from "@material-ui/icons";
import CourseCard from "./CourseCard";
import AxiosInstance, { axiosInstance } from "../../Axios";
import CourseList from "./CourseList";

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
}));
export default function SelectedCourses() {
  const classes = useStyles();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("courses/selected/")
      .then((res) => setCourseList(res.data));
  }, []);
  return (
    <div className={classes.root}>
      <Grid direction="column" container className={classes.selected_courses}>
        <CourseList
          title="دوره های برتر"
          expandButton="همه دوره ها"
          courseList={courseList}
          setCourseList={setCourseList}
        />
      </Grid>
    </div>
  );
}
