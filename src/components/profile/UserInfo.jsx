import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TableCell } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";
import UserInfoInput from "./UserInfoInput";
import UserInfoButton from "./UserInfoButton";
import EditUserDialog from "./EditUserDialog"
import UserInfoListItem from "./UserInfoListItem";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PhoneIcon from "@material-ui/icons/Phone";
import SaveIcon from "@material-ui/icons/Save";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
export default function UserInfo({ user, gamesCount }) {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
    nameField: {
      display: "flex",
      justifyContent: "space-between",
    }
  });

  const classes = useStyles();

  const handleEditClick = () => {
    setEditDialogOpen(!editDialogOpen);
  };
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <CssBaseline />
        <>
          <TableCell className={classes.nameField}>
            <Typography component="p" variant="h4">
              {user.firstName} {user.lastName}
            </Typography>
            <UserInfoButton
              ariaLabel="edit"
              buttonText="Edit"
              clickEvent={handleEditClick}
              adornment={<EditIcon />}
            />
          </TableCell>
          <List>
            <UserInfoListItem
              primaryValue="Email"
              secondaryValue={user.email}
              avatar={<MailOutlineIcon />}
            />
            <UserInfoListItem
              primaryValue="Age"
              secondaryValue={user.age}
              avatar={<AccessibilityNewIcon />}
            />
            <UserInfoListItem
              primaryValue="Phone"
              secondaryValue={user.phone}
              avatar={<PhoneIcon />}
            />
          </List>
        </>
      {editDialogOpen && <EditUserDialog open={editDialogOpen} setOpen={setEditDialogOpen} user={user}/>}
    </>
  );
}
