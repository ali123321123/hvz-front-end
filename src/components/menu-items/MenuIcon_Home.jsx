import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { HomeRounded } from "@material-ui/icons";

const MenuIcon_Home = () => {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    customWidth: {
      maxWidth: 120,
    },
  }));
  const classes = useStyles();

  const onClick = () => {
    history.push("/");
  };
  return (
    <>
      {/* BTN: HOME */}
      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="Home"
          title="Home"
        >
          <ListItem button onClick={onClick}>
            <ListItemIcon>
              <HomeRounded />
              <ListItemText primary="Home" />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      </article>
    </>
  );
};

export default MenuIcon_Home;
