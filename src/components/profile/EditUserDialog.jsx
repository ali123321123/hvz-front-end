import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Checkbox,
  CssBaseline,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MuiThemeProvider,
  TextField,
  IconButton,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import CloseIcon from "@material-ui/icons/Close";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage } from "../../utils/tokenHelper";
import UserInfoInput from "./UserInfoInput";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PhoneIcon from "@material-ui/icons/Phone";
import Grid from "@material-ui/core/Grid";

export default function EditUserDialog({ open, setOpen, user }) {
  const { handleSubmit } = useForm();
  const [setData] = useState(null);

  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const updateUser = () => {
    let data = {
      firstName,
      lastName,
      phone,
      email,
      userName: user.username,
      gender: user.gender,
      id: user.id, 
      password: ""
    };

    fetch(`${Endpoints.USERS_API}/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json().then((res) => console.warn("result", res)));

    setOpen(false);
  };

  const handleFirstname = (e) => setFirstname(e.target.value);
  const handleLastname = (e) => setLastname(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <MuiThemeProvider>
        <CssBaseline />
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          maxWidth="sm"
          aria-labelledby="responsive-dialog-title"
        >
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>

          <DialogTitle id="form-dialog-title">
            <Typography variant="h4">Edit userinfo</Typography>
          </DialogTitle>

          <DialogContent dividers>
            {/* FORM START*/}
            <form onSubmit={handleSubmit((data) => setData(data))}>
              {/* GAME TITLE & IMAGE */}
              <DialogContent>
                <UserInfoInput
                  currentValue={firstName}
                  name="firstname"
                  label="Firstname"
                  id="firstname"
                  onChange={handleFirstname}
                />
                <UserInfoInput
                  currentValue={lastName}
                  label="Lastname"
                  id="lastname"
                  name="lastname"
                  onChange={handleLastname}
                />
              </DialogContent>
              <DialogContent>
                <UserInfoInput
                  currentValue={email}
                  label="Email"
                  id="email"
                  adornment={<MailOutlineIcon />}
                  name="email"
                  width="80%"
                  onChange={handleEmail}
                />
              </DialogContent>
              <DialogContent>
                <UserInfoInput
                  currentValue={age}
                  label="Age"
                  id="age"
                  adornment={<AccessibilityNewIcon />}
                  name="age"
                  onChange={handleAge}
                />
                <UserInfoInput
                  currentValue={phone}
                  label="Phone"
                  id="phone"
                  adornment={<PhoneIcon />}
                  name="phone"
                  onChange={handlePhone}
                />
              </DialogContent>

              {/* BUTTON UPDATE USER */}
              <section>
                <DialogActions>
                  <Button
                    className="buttonPink"
                    color="primary"
                    type="button"
                    onClick={updateUser}
                  >
                    Update userinfo
                  </Button>
                </DialogActions>
              </section>
            </form>
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
