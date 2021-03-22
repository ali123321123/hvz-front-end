import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

import { loginRequest } from "../../utils/loginApi";
import Auth from "../../utils/authentication";

import {errorToaster} from '../../utils/global'

function LoginForm() {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
    },

    media: {
      //paddingTop: "56.25%", // 16:9
      paddingTop: "75%", // 4:3
      objectFit: "cover",
      width: "80%",
      borderRadius: "100%",
      margin: "auto",
      marginTop: "2em",
    },

    primary: {
      main: "#a61766",
    },
    palette: {
      type: "dark",
      common: {
        black: "#a61766",
      },
    },
    customWidth: {
      maxWidth: 120,
    },

    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
      textAlign: "center",
    },

    divider: {
      marginTop: "0px",
      height: "1px",
    },
  }));

  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if(username === "" || password === ""){
        errorToaster("Input fields are empty")
        return;
    }
    Auth.loginUser(await loginRequest(username, password));
  };

  return (
    <FormControl className={classes.container}>
      <InputLabel htmlFor="my-input">Username</InputLabel>
      <Input
        value={username}
        id="UsernameInput"
        aria-describedby="my-helper-text"
        placeholder="Username"
        onChange={handleUsernameChange}
      />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
      <InputLabel htmlFor="my-input">Password</InputLabel>
      <Input
        type="password"
        value={password}
        id="PasswordInput"
        aria-describedby="my-helper-text"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
      <Button onClick={handleLogin}>Login</Button>
    </FormControl>
  );
}



export default LoginForm;
