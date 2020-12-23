import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import TextField from "./TextField";

const useStyle = makeStyles((theme) => ({
  input: {
    margin: "8px 0",
    direction: "rtl",
  },
}));

export default function FormInput({ lable, inputRef, name, errors }) {
  const classes = useStyle();
  return (
    <>
      <TextField
        className={classes.input}
        lable={lable}
        inputRef={inputRef}
        name={name}
      />
      {errors.name && (
        <Typography variant="caption" color={"error"}>
          {errors.name.message}
        </Typography>
      )}
    </>
  );
}
