import {
  CircularProgress,
  Grid,
  Input,
  makeStyles,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../Axios";
import TextField from "../../CustomComponents/TextField";
import Button from "../../CustomComponents/Button";
import { width } from "@material-ui/system";
import clsx from "clsx";
import { CitiesList } from "../../../Lists/CitiesList";
import Notification from "../../CustomComponents/Notification";
import axios from "axios";
import ImageInput from "../../CustomComponents/ImageInput";

const useStyle = makeStyles((theme) => ({
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
    margin: "8px 4px 8px 4px",
    width: "100%",
    [theme.breakpoints.down("sm")]: { width: "100%" },
  },
  address_field: {
    width: "100%",
  },
  "&:focus": {
    backgroundColor: "none",
  },
}));

export default function EditUser() {
  const classes = useStyle();

  const citiesList = CitiesList();

  const cities = () =>
    citiesList.map((item) => (
      <option key={item.id} value={item.value}>
        {item.city}
      </option>
    ));

  const history = useHistory();
  const [User, setUser] = useState({
    loaded: false,
    data: { avatar: "" },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues: User,
  });

  const [avatar, setAvatar] = useState("");

  const [uploading, setuploading] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState({ length: 0 });

  watch("avatar");

  useEffect(() => {
    setValue("avatar", uploadedAvatar);
  }, [uploadedAvatar]);

  const onSubmit = (formData) => {
    let newFormData = new FormData();
    if (uploadedAvatar.length === 0) {
      null;
    } else {
      newFormData.append("avatar", uploadedAvatar[0]);
    }

    newFormData.append("phone_number", formData.phone_number);
    newFormData.append("national_code", formData.national_code);
    newFormData.append("name", formData.name);
    newFormData.append("email", formData.email);
    newFormData.append("birth_date", formData.birth_date);
    newFormData.append("address", formData.address);
    newFormData.append("city", formData.city);
    newFormData.append("coins", 25);

    const config = {
      method: "put",
      url: "/api/accounts/user/",
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

    axios(config)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "تغییرات با موفقیت ذخیره شد",
          type: "success",
        });
        location.reload();
      })
      .catch((error) => {
        console.log(error.response);

        switch (error.response.data.error) {
          case "unique email":
            setNotify({
              isOpen: true,
              message: "این ایمیل قبلا در دیتابیس استفاده شده",
              type: "error",
            });
            break;
          case "unique phoneNumber":
            setNotify({
              isOpen: true,
              message: "این شماره تلفن قبلا در دیتابیس استفاده شده",
              type: "error",
            });
            break;
          default:
            setNotify({
              isOpen: true,
              message: "مشکلی وجود دارد",
              type: "error",
            });
            break;
        }
        if (error.response.data.error === "unique email") {
          setNotify({
            isOpen: true,
            message: "این ایمیل قبلا در دیتابیس استفاده شده",
            type: "error",
          });
        }
      });
  };
  const avatarfile = watch("avatar");

  useEffect(() => {
    axiosInstance
      .get("accounts/user/")
      .then((res) => {
        const data = res.data;
        setUser({ data, loaded: true });
      })
      .catch((error) => {
        history.push("/logout");
      });
  }, []);
  useEffect(() => {
    if (User.data.avatar) {
      setAvatar(User.data.avatar);
    }
  }, [User]);

  return (
    <div className={classes.root}>
      {User.loaded ? (
        <Grid>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="name"
                    className={classes.input}
                    label="نام و نام خانوادگی"
                    defaultValue={User.data.name}
                  />
                  {errors.name && (
                    <Typography variant="caption" color={"error"}>
                      {errors.name.message}
                    </Typography>
                  )}
                </Grid>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    inputRef={register({
                      required: { value: true, message: "ایمیل را وارد کنید" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "ایمیل نا معتبر",
                      },
                    })}
                    name="email"
                    className={classes.input}
                    label="ایمیل"
                    defaultValue={User.data.email}
                  />
                  {errors.email && (
                    <Typography variant="caption" color={"error"}>
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    inputRef={register}
                    name="phone_number"
                    className={classes.input}
                    label="شماره تماس"
                    defaultValue={User.data.phone_number}
                  />
                  {errors.phone_number && (
                    <Typography variant="caption" color={"error"}>
                      {errors.phone_number.message}
                    </Typography>
                  )}
                </Grid>
                <Grid container item direction="column" sm={6} xs={12}>
                  <TextField
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register}
                    name="birth_date"
                    className={classes.input}
                    label="تاریخ تولد"
                    defaultValue={User.data.birth_date}
                  />
                  {errors.birth_date && (
                    <Typography variant="caption" color={"error"}>
                      {errors.birth_date.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid container item direction="column" sm={10} xs={12}>
                  <TextField
                    inputRef={register}
                    name="address"
                    className={clsx(classes.input, classes.address_field)}
                    label="آدرس"
                    defaultValue={User.data.address}
                  />
                  {errors.address && (
                    <Typography variant="caption" color={"error"}>
                      {errors.address.message}
                    </Typography>
                  )}
                </Grid>
                <Grid container item direction="column" sm={2} xs={12}>
                  <TextField
                    inputRef={register}
                    name="city"
                    className={clsx(classes.input, classes.address_field)}
                    label="شهر"
                    defaultValue={User.data.address}
                    select
                    SelectProps={{
                      native: true,
                    }}
                    defaultValue={User.data.city}
                  >
                    {cities()}
                  </TextField>
                  {errors.address && (
                    <Typography variant="caption" color={"error"}>
                      {errors.address.message}
                    </Typography>
                  )}
                </Grid>
                <TextField
                  inputRef={register}
                  name="national_code"
                  className={clsx(classes.input)}
                  label="کد ملی"
                  defaultValue={User.data.national_code}
                />
                {errors.address && (
                  <Typography variant="caption" color={"error"}>
                    {errors.address.message}
                  </Typography>
                )}

                {avatar ? (
                  <ImageInput
                    defaultImg={avatar}
                    // InputRef={register}
                    name="avatar"
                    label="آواتار"
                    uploadedImage={uploadedAvatar}
                    setUploadedImage={setUploadedAvatar}
                  />
                ) : null}
              </Grid>

              <Grid container>
                <Button
                  style={{ marginTop: 10 }}
                  color="secondary"
                  type="submit"
                  text="ذخیره تغییرات"
                />
                {uploading ? <CircularProgress color="secondary" /> : null}
              </Grid>
            </form>
          </Paper>
          <Notification notify={notify} setNotify={setNotify} />
        </Grid>
      ) : null}
    </div>
  );
}
