import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({}));

const Input = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const classes = useStyles();

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField className={classes.input} {...configTextfield} />;
};

export default Input;
