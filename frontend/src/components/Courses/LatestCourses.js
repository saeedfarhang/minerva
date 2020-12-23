import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios";
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

// change this for the number of latest courses
const newestCourseCount = 6;

export default function LatestCourses() {
  const classes = useStyles();
  const [courseList, setCourseList] = useState([]);
  const [LatestCourses, setLatestCourses] = useState([]);
  useEffect(() => {
    axiosInstance.get("courses/").then((res) => setAllCourses(res.data));
  }, []);
  useEffect(() => {
    setCourseList(LatestCourses.slice(0, newestCourseCount));
  }, [LatestCourses]);
  return (
    <div className={classes.root}>
      <Grid direction="column" container className={classes.selected_courses}>
        <CourseList
          title="آخرین آپدیت شده ها"
          expandButton="مشاهده بیشتر"
          courseList={courseList}
          setCourseList={setCourseList}
        />
      </Grid>
    </div>
  );
}
