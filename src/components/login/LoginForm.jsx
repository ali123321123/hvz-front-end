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

import { errorToaster } from "../../utils/global";
import { useHistory } from "react-router";

import Validation from "../../utils/validation";

function LoginForm({ game }) {
  const history = useHistory();
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

  const [formData, setFormData] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      errorToaster("Username or password is empty");
      return;
    }
    const loginData = await loginRequest(username, password);
    if (loginData) {
      console.log(loginData);
      try {
        await Auth.loginUser(loginData);
      } finally {
        if (Auth.userIsAdmin()) {
          console.log("is admin");
          if (game) {
            history.push({
              pathname: `/admin/game/${game.id}`,
              state: game,
            });
          } else {
            history.push(`/`);
          }
        } else {
          if (game) {
            history.push(`/game/${game.id}`);
          } else {
            history.push(`/`);
          }
        }
      }
    }
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
