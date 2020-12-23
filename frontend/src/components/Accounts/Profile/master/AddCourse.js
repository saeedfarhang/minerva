import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { axiosInstance } from "../../../../Axios";
import { useForm } from "react-hook-form";
import Notification from "../../../CustomComponents/Notification";
import Button from "../../../CustomComponents/Button";
import TextField from "../../../CustomComponents/TextField";
import AddLesson from "./AddLesson";
import ImageInput from "../../../CustomComponents/ImageInput";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: { padding: "20px 15%", justifyContent: "center" },
  paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    margin: "8px 4px 8px 4px",
    width: "100%",
    [theme.breakpoints.down("sm")]: { width: "100%" },
  },
}));

export default function AddCourse() {
  const history = useHistory();
  const classes = useStyles();
  const [User, setUser] = useState({});
  const [master, setMaster] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [uploadedthumbnail, setUploadedthumbnail] = useState({ length: 0 });
  const [uploading, setuploading] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    axiosInstance
      .get("accounts/user/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        history.push("/logout");
      });
  }, []);
  useEffect(() => {
    setMaster(User.is_master);
  });

  const onSubmit = (formData) => {
    let newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("price", formData.price);
    newFormData.append("thumbnail", uploadedthumbnail[0]);

    const config = {
      method: "post",
      url: "/api/courses/",
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
      data: newFormData,
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percentage = Math.floor((loaded * 100) / total);
        console.log(`${loaded} kb of ${total}kb | ${percentage}%`);
        if (percentage < 100) {
          setuploading(true);
        } else {
          setuploading(false);
        }
      },
    };
    Axios(config)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "تغییرات با موفقیت ذخیره شد",
          type: "success",
        });
        // location.reload();
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            setNotify({
              isOpen: true,
              message: "مشکلی پیش آمد",
              type: "error",
            });
            break;
          default:
            break;
        }
      });
  };

  return (
    <div className={classes.root}>
      {master ? (
        <Grid>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="title"
                    className={classes.input}
                    label="تایتل"
                  />
                  {errors.title && (
                    <Typography variant="caption" color={"error"}>
                      {errors.title.message}
                    </Typography>
                  )}
                </Grid>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="price"
                    className={classes.input}
                    label="قیمت"
                  />
                  {errors.title && (
                    <Typography variant="caption" color={"error"}>
                      {errors.title.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <TextField
                inputRef={register({ required: "این فیلد نمیتواند خالی باشد" })}
                name="description"
                className={classes.input}
                label="توضیحات"
                multiline={true}
                rows={4}
              />
              {errors.description && (
                <Typography variant="caption" color={"error"}>
                  {errors.description.message}
                </Typography>
              )}
              <ImageInput
                defaultImg={null}
                // InputRef={register}
                name="thumbnail"
                label="آواتار"
                uploadedImage={uploadedthumbnail}
                setUploadedImage={setUploadedthumbnail}
              />
              <Button type="submit" text="ایجاد" />
            </form>
          </Paper>
        </Grid>
      ) : (
        <Typography variant="h1">access deny</Typography>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
