import {
  MuiThemeProvider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Button,
  FormGroup,
  TextField,
  Container,
  CssBaseline,
  Avatar,
  Typography,
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Auth from "../../utils/authentication";
import { errorToaster, successToaster } from "../../utils/global";
import { registerRequest } from "../../utils/registerApi";
import { light } from "../shared/themeGameCards";
import RegisterFormInputFiled from "./RegisterFormInputFiled";

function RegisterForm() {
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [formData, setFormData] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setlastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(parseInt(e.target.value));
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      errorToaster("Passwords don't match");
      return;
    }
    // const data = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   username: username,
    //   password: password,
    //   age: age,
    //   phone: phoneNumber,
    //   role: "User",
    //   email: email,
    // };
    // if (data) {
    //   console.log(data);
    //   const registerResponse = await registerRequest(data);
    //   console.log(registerResponse);
    //   if (registerResponse.status === 200) {
    //     successToaster("Registration success!");
    //     history.push("/");
    //   } else {
    //       if(registerResponse)
    //       console.log(registerResponse);
    //     errorToaster(`Registration error! \n ${registerResponse.errors.map((error) => error.message)}`);
    //   }
    // }
  };

  const handleEnterKeypress = (e) => {
    if (e.key === "Enter") handleRegister();
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
            Register
          </Typography>
          <FormGroup>
            <InputLabel htmlFor="my-input">First name</InputLabel>
            <TextField
              required
              value={firstName}
              variant="outlined"
              margin="normal"
              label="First name"
              fullWidth
              autoComplete="first name"
              id="FirstnameInput"
              aria-describedby="firstname"
              onChange={handleFirstNameChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="my-input">Last name</InputLabel>
            <TextField
              required
              value={lastName}
              variant="outlined"
              margin="normal"
              label="Last name"
              fullWidth
              autoComplete="last name"
              id="LastnameInput"
              aria-describedby="lastname"
              onChange={handleLastNameChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="my-input">Age</InputLabel>
            <TextField
              type="number"
              required
              value={age}
              variant="outlined"
              margin="normal"
              label="Age"
              fullWidth
              autoComplete="age"
              id="AgeInput"
              aria-describedby="age"
              onChange={handleAgeChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="my-input">Phone number</InputLabel>
            <TextField
              type="number"
              required
              value={phoneNumber}
              variant="outlined"
              margin="normal"
              label="Phone number"
              fullWidth
              autoComplete="phone"
              id="PhoneInput"
              aria-describedby="phonenumber"
              onChange={handlePhoneNumberChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <TextField
              required
              value={email}
              variant="outlined"
              margin="normal"
              label="Email"
              fullWidth
              autoComplete="email"
              id="EmailInput"
              aria-describedby="email"
              onChange={handleEmailChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="my-input">Username</InputLabel>
            <TextField
              required
              value={username}
              variant="outlined"
              margin="normal"
              label="Username"
              fullWidth
              id="UsernameInput"
              aria-describedby="username"
              onChange={handleUsernameChange}
              onKeyPress={handleEnterKeypress}
            />

            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <TextField
              required
              value={password}
              variant="outlined"
              margin="normal"
              label="Password"
              fullWidth
              type="password"
              id="PasswordInput"
              aria-describedby="password"
              onChange={handlePasswordChange}
              onKeyPress={handleEnterKeypress}
            />
            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="my-input">Repeat Password</InputLabel>
            <TextField
              required
              type="password"
              value={repeatPassword}
              variant="outlined"
              margin="normal"
              label="Repeat Password"
              fullWidth
              id="RepeatPasswordInput"
              aria-describedby="repeatPassword"
              onChange={handleRepeatPasswordChange}
              onKeyPress={handleEnterKeypress}
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
            onClick={handleRegister}
          >
            Register
          </Button>
        </FormControl>
      </MuiThemeProvider>
    </Container>
  );
}

export default RegisterForm;
