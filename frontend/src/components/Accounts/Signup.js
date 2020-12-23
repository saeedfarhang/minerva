import { Grid, Input, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../Axios";
import { IsAuth } from "../../IsAuth";
import Button from "../CustomComponents/Button";
import Notification from "../CustomComponents/Notification";
import TextField from "../CustomComponents/TextField";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  input: {
    margin: "8px 0",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (formData) => {
    axiosInstance
      .post("accounts/signup/", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        password2: formData.password2,
      })
      .then((res) => {
        axiosInstance
          .post("token/", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");
            location.replace("/");
          })
          .catch((error) => {
            switch (error.response.status) {
              case 400:
                setNotify({
                  isOpen: true,
                  message: "Bad Request",
                  type: "error",
                });
                break;
              case 401:
                setNotify({
                  isOpen: true,
                  message: "ایمیل یا پسورد وارد شده صحیح نیست",
                  type: "error",
                });
                break;
            }
          });
      });
  };

  const history = useHistory();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(IsAuth());
    isAuth ? history.push("/") : null;
  }, [isAuth]);

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Paper className={classes.paper}>
            <Typography style={{ paddingBottom: 10 }} variant="h4">
              ورود
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className={classes.input}
                className={classes.input}
                label="ایمیل"
                inputRef={register({
                  required: { value: true, message: "ایمیل را وارد کنید" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "ایمیل نا معتبر",
                  },
                })}
                name="email"
              />
              {errors.email && (
                <Typography variant="caption" color={"error"}>
                  {errors.email.message}
                </Typography>
              )}
              <TextField
                className={classes.input}
                label="نام و نام خانوادگی"
                inputRef={register({
                  required: {
                    value: true,
                    message: "نام و نام خانوادگی را وارد کنید",
                  },
                })}
                type="text"
                name="name"
              />
              {errors.name && (
                <Typography variant="caption" color={"error"}>
                  {errors.name.message}
                </Typography>
              )}
              <TextField
                className={classes.input}
                label="پسورد"
                inputRef={register({
                  required: {
                    value: true,
                    message: "پسورد را وارد کنید",
                  },
                })}
                type="password"
                name="password"
              />
              {errors.password && (
                <Typography variant="caption" color={"error"}>
                  {errors.password.message}
                </Typography>
              )}
              <TextField
                className={classes.input}
                label="تایید پسورد"
                inputRef={register({
                  required: {
                    value: true,
                    message: "پسورد را تایید کنید",
                  },
                })}
                type="password"
                name="password2"
              />
              {errors.password2 && (
                <Typography variant="caption" color={"error"}>
                  {errors.password2.message}
                </Typography>
              )}

              <Grid container>
                <Button type="submit" text="ثبت نام" />
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
