import { React, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Switch,
  CssBaseline,
} from "@material-ui/core";
import { themeActive, light } from "../shared/themeGameCards";

const MenuIcon_ThemeToggle = () => {
  const [theme, setTheme] = useState(true);
  const [checked, setChecked] = useState(true);

  const handleColorTheme = () => {
    setTheme((t) => !t);
    setChecked((c) => !c);
  };

  return (
    <>
      <MuiThemeProvider theme={theme ? light : themeActive}>
        <CssBaseline />
      </MuiThemeProvider>
      <Tooltip
        arrow
        placement={"bottom"}
        aria-label="toggle theme"
        title="Toggle Theme"
      >
        <ListItem button>
          <ListItemIcon>
            <Switch checked={checked} onChange={handleColorTheme} />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
        </ListItem>
      </Tooltip>
    </>
  );
};

export default MenuIcon_ThemeToggle;
