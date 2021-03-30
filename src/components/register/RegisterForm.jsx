import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import RegisterFormInputFiled from "./RegisterFormInputFiled";
import { errorToaster } from "../../utils/global";
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
    const NameRGEX = /^[a-zA-Z'\-\s0-9]$/;
    if(NameRGEX.test(e.target.value)){
      errorToaster("username is not valid yet");
      return;
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const PasswordRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(PasswordRGEX.test(e.target.value)){
      errorToaster("Password is not valid yet");
      return;
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    console.log(e.target.value)
  
    setFirstName(e.target.value);
    const NameRGEX = /^[a-zA-Z'\-\s0-9]$/;
    if(NameRGEX.test(e.target.value)){
      errorToaster("Firstname is not valid yet");
      return;
    }
  };

  const handleLastNameChange = (e) => {
    setlastName(e.target.value);
    const NameRGEX = /^[a-zA-Z'\-\s0-9]$/;
    if(NameRGEX.test(e.target.value)){
      errorToaster("Lastname is not valid yet");
      return;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRGEX =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRGEX.test(e.target.value)){
      errorToaster("Email is not valid yet");
      return;
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    const phoneNumberRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if(phoneNumberRGEX.test(e.target.value)){
      errorToaster("Phone is not valid yet");
      return;
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    if(e.target.value<0){
      errorToaster("Age is not valid yet");
      return;
    }
  };

  const handleRegisterClick = () => {
   
 

   
    
    

  
    if(firstName === "" || lastName==="" || age==="" ||email==="" || phoneNumber==="" || username==="" || repeatPassword===""){
      errorToaster("All fields must be filled out");
      return;
    }
    /*
    if(NameRGEX.test(firstName)){
      errorToaster("Please enter a valid Firstname");
      return;
    }
    if(NameRGEX.test(lastName)){
      errorToaster("Please enter a valid Lastname");
      return;
    }
    if(NameRGEX.test(username)){
      errorToaster("Please enter a valid username");
      return;
    }
    if(NameRGEX.test(username)){
      errorToaster("Please enter a valid username");
      return;
    }
    if(emailRGEX.test(email)){
      errorToaster("Please enter a valid email");
      return;
    }
if(phoneNumberRGEX.test(phoneNumber))
{
  errorToaster("Please enter a valid phoneNumber");
  return;
}
if(age<0 ){
  errorToaster("Please enter a valid age");
  return;
}
if(PasswordRGEX.test(password))
{
  errorToaster("Please enter a valid password");
  return;
}
  */
    setFormData({
      username: username,
    });
  };

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
        required=""
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
