import React, { useState, useEffect, useRef } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import "./GameChat.scss";
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
      color: "primary",
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
        display: "none",
      },
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      scrollHeight: "0",
    },
    chatHeader: {
      alignItems: "center",
      textAlign: "center",
      background: "#683db8",
      fontSize: "20px",
      height: "50px",
      cursor: "pointer"
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  const moment = require("moment");

  const {
    data: chats,
    error: chatsError,
  } = useSWR(
    `${Endpoints.GAME_API}/${gameId}/chats`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 10 }
  );
  
  // Makes sure the div is scrolled to bottom when new message is recieved
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chats]);

  const [gameChatOpen, setGameChatOpen] = useState();
  const [factionChatOpen, setFactionChatOpen] = useState();
  const [squadChatOpen, setSquadChatOpen] = useState();
  return (
      <>
    <div className="chatContainer">
      <div class="card">
        <Grid
          container
          className={classes.chatHeader}
          onClick={() => setGameChatOpen(!gameChatOpen)}
        >
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            Gamechat
          </Grid>
          <Grid item xs={2}>
            <CloseIcon />
          </Grid>
        </Grid>

        {!gameChatOpen &&
        <div>
          <div class="card-content chat-content">
            <div class="content" >
              {chats?.filter(
                  (chat) =>
                    (!chat.isHumanGlobal && !chat.isZombieGlobal && chat.gameId)
                )
                .sort((a, b) => a.chatTime - b.chatTime)
                .map((c,i) => (
                        <>
                  <div class={`chat-message-group ${c.username === token.actort?"writer-user":""}`} >
                    <div class="chat-messages">
                      <div class="from">{c.username}</div>
                      <div class="message">{c.message}</div>
                      <div class="from">{moment(`${c.chatTime}`).format("HH:mm")}</div>
                    </div>
                  </div>
                  </>
                ))}
                 
            </div>
          </div>
          <footer class="card-footer">
              <GameChatInput isGlobal={true} />
          </footer>
        </div>
        }
      </div>
    </div>

    <div className="chatContainer chat2">
      <div class="card">
        <Grid
          container
          className={classes.chatHeader}
          onClick={() => setFactionChatOpen(!factionChatOpen)}
        >
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            Factionchat
          </Grid>
          <Grid item xs={2}>
            <CloseIcon />
          </Grid>
        </Grid>

        {!factionChatOpen &&
        <div>
          <div class="card-content chat-content">
            <div class="content" >
              {chats?.filter(
                  (chat) =>
                    (chat.isHumanGlobal || chat.isZombieGlobal && chat.gameId)
                )
                .sort((a, b) => a.chatTime - b.chatTime)
                .map((c,i) => (
                        <>
                  <div class={`chat-message-group ${c.username === token.actort?"writer-user":""}`} >
                    <div class="chat-messages">
                      <div class="from">{c.username}</div>
                      <div class="message">{c.message}</div>
                      <div class="from">{moment(`${c.chatTime}`).format("HH:mm")}</div>
                    </div>
                  </div>
                  </>
                ))}
                 
            </div>
          </div>
          <footer class="card-footer">
              <GameChatInput isGlobal={false} />
          </footer>
        </div>
        }
      </div>
    </div>
    </>
    
    // <div className={classes.root}>
    //   <Paper className={classes.paper}>
    //     <AppBar position="static" color="default">
    //       <Tabs
    //         value={value}
    //         onChange={handleChange}
    //         indicatorColor="primary"
    //         textColor="primary"
    //         variant="fullWidth"
    //         aria-label="Game Chat tabbed"
    //       >
    //         <Tab label="Global" {...tabProps(0)} />
    //         <Tab label="Faction" {...tabProps(1)} />
    //       </Tabs>
    //     </AppBar>
    //       <TabPanel
    //         value={value}
    //         index={0}
    //         dir={theme.direction}
    //       >
    //       <Paper className={classes.messageDiv}>
    //           {chats
    //             ?.filter(
    //                 chats => (chats.isHumanGlobal && chats.isZombieGlobal)
    //                 || (!chats.isHumanGlobal && !chats.isZombieGlobal)

    //                 ).sort((a, b) => a.chatTime - b.chatTime)
    //             .map((c) => (
    //               <GameChatMessage chat={c} username={token.actort}/>
    //             ))}
    //             <div ref={messagesEndRef} />
    //             </Paper>
    //         <GameChatInput isGlobal={true} />
    //       </TabPanel>
    //       <TabPanel value={value} index={1} dir={theme.direction}>
    //         <Paper className={classes.messageDiv}>
    //           {chats
    //             ?.filter(chats => (chats.isHumanGlobal && !chats.isZombieGlobal)
    //             || (!chats.isHumanGlobal && chats.isZombieGlobal)

    //             ).sort((a, b) => a.chatTime - b.chatTime)
    //             .map((c) => (
    //               <GameChatMessage chat={c}  username={token.actort}/>
    //             ))}
    //         </Paper>
    //         <GameChatInput isGlobal={false} />
    //       </TabPanel>
    //   </Paper>
    // </div>
  );
}
