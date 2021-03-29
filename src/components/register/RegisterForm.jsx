import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterFormInputFiled from "./RegisterFormInputFiled";
import { registrationRequest } from "../../utils/registerApi";
import Validation from "../../utils/validation";

function RegisterForm() {
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
      margin: "0 auto",
      textAlign: "center",
    },

    divider: {
      marginTop: "0px",
      height: "1px",
    },
  }));

  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleRegisterClick = () => {
    setFormData({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      age: age,
      phone: phoneNumber,
      gender: gender,
      role: "User",
      email: email,
    });
  };

  useEffect(() => {
    if (formData) {
      const validateRegisterRes = Validation.registerDataValidation(formData);
      if (validateRegisterRes) {
        const registerRes = registrationRequest(formData);
      }
    }
  }, [formData]);

  return (
    <FormControl className={classes.container}>
      <RegisterFormInputFiled
        title="First Name"
        type="text"
        value={firstName}
        handleFunction={handleFirstNameChange}
      />
      <RegisterFormInputFiled
        title="Last Name"
        type="text"
        value={lastName}
        handleFunction={handleLastNameChange}
      />
      <RegisterFormInputFiled
        title="Age"
        type="number"
        value={age}
        handleFunction={handleAgeChange}
      />
      <RegisterFormInputFiled
        title="Email"
        type="text"
        value={email}
        handleFunction={handleEmailChange}
      />
      <RegisterFormInputFiled
        title="Phonenumber"
        type="number"
        value={phoneNumber}
        handleFunction={handlePhoneNumberChange}
      />
      <RegisterFormInputFiled
        title="Username"
        type="text"
        value={username}
        handleFunction={handleUsernameChange}
      />
      <RegisterFormInputFiled
        title="Password"
        type="password"
        value={password}
        handleFunction={handlePasswordChange}
      />
      <RegisterFormInputFiled
        title="Repeat password"
        type="password"
        value={repeatPassword}
        handleFunction={handleRepeatPasswordChange}
      />
      <Button onClick={handleRegisterClick}>Register</Button>
    </FormControl>
  );
}

export default RegisterForm;
