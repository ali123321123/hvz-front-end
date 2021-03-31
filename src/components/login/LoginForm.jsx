import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  MuiThemeProvider,
  TextField,
  Typography,
} from "@material-ui/core";
import { loginRequest } from "../../utils/loginApi";
import Auth from "../../utils/authentication";
import { errorToaster } from "../../utils/global";
import { useHistory } from "react-router";
import Validation from "../../utils/validation";
import { themeActive, light } from "../shared/themeGameCards";
import { LockOpenOutlined } from "@material-ui/icons";

function LoginForm({ game }) {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(18),
      paddingBottom: theme.spacing(4),
      textAlign: "center",
    },

    submit: {
      margin: theme.spacing(3, 0, 2),
      width: "50%",
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

  const handleLoginEnterPress = e => {
    if(e.key === 'Enter') handleLogin()
}

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
            history.push(`/admin`);
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
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={light}>
        <CssBaseline />

        <FormControl className={classes.container}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlined />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormGroup>
            <InputLabel htmlFor="my-input">Username</InputLabel>
            <TextField
              required
              value={username}
              variant="outlined"
              margin="normal"
              label="Username"
              fullWidth
              autoComplete="email"
              id="UsernameInput"
              aria-describedby="username"
              onChange={handleUsernameChange}
              onKeyPress={handleLoginEnterPress}
            />

            {/* <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText> */}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <TextField
              required
              type="password"
              value={password}
              variant="outlined"
              margin="normal"
              label="Password"
              autoComplete="current-passsword"
              fullWidth
              type="password"
              id="PasswordInput"
              aria-describedby="password"
              onChange={handlePasswordChange}
              onKeyPress={handleLoginEnterPress}
            />
            {/* <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText> */}
          </FormGroup>

          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </FormControl>
      </MuiThemeProvider>
    </Container>
  );
}

export default LoginForm;
