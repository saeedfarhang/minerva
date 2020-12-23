import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Edit, ShoppingCart } from "@material-ui/icons";
import { height } from "@material-ui/system";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Axios";
import Button from "../CustomComponents/Button";
import VideoPlayer from "../CustomComponents/VideoPlayer";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: { padding: 20 },
  paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  course_detail: {
    // width: "400px",
    height: "400px",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function CoursePage({ match }) {
  const classes = useStyles();
  const [course, setCourse] = useState({});
  const [userBasket, setUserBasket] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosInstance.get(`courses/${match.params.id}/`).then((res) => {
      setCourse(res.data);
    });
    axiosInstance
      .get("accounts/basket/")
      .then((res) => setUserBasket(res.data.courses));
  }, []);

  useEffect(() => {
    axiosInstance.get("accounts/user/").then((res) => {
      setUser(res.data);
    });
  }, ["accounts/user/"]);

  useEffect(() => {
    if (userBasket.includes(course.id)) {
    } else {
      null;
    }
  }, [userBasket, course]);

  return (
    <div className={classes.root}>
      <Grid spacing={2} justify="center" alignContent="center" container>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          {/* <Paper className={clsx(classes.course_intro_video)}></Paper> */}
          <VideoPlayer url="/static/frontend/0.mp4" />
        </Grid>
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Paper className={clsx(classes.course_detail, classes.paper)}>
            {user.id !== course.master ? (
              userBasket.includes(course.id) ? (
                <Link
                  className={classes.link}
                  to={`/courses/${course.id}/basket/delete`}
                >
                  <Button
                    color="primary"
                    // style={{ backgroundColor: "red", color: "white" }}
                    size="small"
                    startIcon={<RemoveShoppingCartIcon color="error" />}
                    text="حذف از سبد خرید"
                  />
                </Link>
              ) : (
                <Link
                  className={classes.link}
                  to={`/courses/${course.id}/basket/add`}
                >
                  <Button
                    color="secondary"
                    size="small"
                    startIcon={<ShoppingCart />}
                    text="افزودن به سبد خرید"
                  />
                </Link>
              )
            ) : (
              <Link
                className={classes.link}
                to={`/courses/${course.id}/basket/delete`}
              >
                <Button
                  color="primary"
                  size="small"
                  startIcon={<Edit color="error" />}
                  text="ویرایش"
                />
              </Link>
            )}

            <Grid container alignItems="center">
              <Typography variant="body1" style={{ padding: 10 }}>
                عنوان
              </Typography>
              <Typography variant="h4">{course.title}</Typography>
            </Grid>
            <Divider style={{ margin: 10 }} />
            <Grid container alignItems="center">
              <Typography variant="body2" style={{ padding: 10 }}>
                دسته بندی
              </Typography>
              <Typography variant="h5">{course.title}</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
