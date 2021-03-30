import React, { useState, useEffect , useRef } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Auth from "../../../utils/authentication";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage, decodedToken } from "../../../utils/tokenHelper";
import { makeStyles, Paper, useTheme } from "@material-ui/core";
import GameChatInput from "./GameChatInput";
import GameChatMessage from "./GameChatMessage";
import TabPanel from "./TabPanel";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function GameChat() {
  const { id: gameId } = useParams();
  const history = useHistory();
  const token = decodedToken();
  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "8%",
      color: "primary"
    },
    paper: {
      width: "90%",
      maxWidth: "800px",
      margin: "auto",
      height: "80vh",
      backgroundColor: "white",
    },
    messageDiv: {
      width: "100%",
      height: "60vh",
      margin: "auto",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
          display: "none"
      },
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      scrollHeight: "0"
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const {
    data: chats,
    error: chatsError,
  } = useSWR(
    `${Endpoints.GAME_API}/${gameId}/chats`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 10 }
  );
    // Makes sure the div is scrolled to bottom when new message is recieved
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [chats, value])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Game Chat tabbed"
          >
            <Tab label="Global" {...tabProps(0)} />
            <Tab label="Faction" {...tabProps(1)} />
          </Tabs>
        </AppBar>
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
          >
          <Paper className={classes.messageDiv}>
              {chats
                ?.filter(
                    chats => (chats.isHumanGlobal && chats.isZombieGlobal)
                    || (!chats.isHumanGlobal && !chats.isZombieGlobal)
                    
                    ).sort((a, b) => a.chatTime - b.chatTime)
                .map((c) => (
                  <GameChatMessage chat={c} username={token.actort}/>
                ))}
                <div ref={messagesEndRef} />
                </Paper>
            <GameChatInput isGlobal={true} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Paper className={classes.messageDiv}>
              {chats
                ?.filter(chats => (chats.isHumanGlobal && !chats.isZombieGlobal)
                || (!chats.isHumanGlobal && chats.isZombieGlobal)
                
                ).sort((a, b) => a.chatTime - b.chatTime)
                .map((c) => (
                  <GameChatMessage chat={c}  username={token.actort}/>
                ))}
            </Paper>
            <GameChatInput isGlobal={false} />
          </TabPanel>
      </Paper>
    </div>
  );
}
