import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function UserInfoInput({
  currentValue,
  adornment,
  label,
  id,
  width,
  onChange,
  name
}) {
  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: width
    },
  }));

  const classes = useStyles();

  return (
    <TextField
      required
      id={id}
      name={name}
      className={classes.textField}
      label={label}
      defaultValue={currentValue}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adornment}</InputAdornment>
        ),
      }}
    />
  );
}
