import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Auth from "../../../utils/authentication";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage, decodedToken } from "../../../utils/tokenHelper";
import { makeStyles, useTheme } from "@material-ui/core";
import GameChatInput from "./GameChatInput";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Grid from "@material-ui/core/Grid";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ForumIcon from "@material-ui/icons/Forum";
import GroupIcon from "@material-ui/icons/Group";
import PublicIcon from "@material-ui/icons/Public";
import Fab from "@material-ui/core/Fab";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
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
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(1),
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
      cursor: "pointer",
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

  const [chatOpen, setChatOpen] = useState();
  const [globalChatOpen, setGlobalChatOpen] = useState();
  const [factionChatOpen, setFactionChatOpen] = useState();
  const [squadChatOpen, setSquadChatOpen] = useState();

  // Chat Speed Dial
  const actions = [
    {
      icon: <SportsKabaddiIcon />,
      name: "Faction",
      action: () => handleOpenFactionChat(),
    },
    { icon: <PublicIcon />, name: "Global", action: () => handleOpenGlobalChat() },
    { icon: <GroupIcon />, name: "Squad" },
  ];
  const [speedDialOpen, setSpeedDialOpen] = useState();
  const handleSpeedDialOpen = () => setSpeedDialOpen(!speedDialOpen);

  const handleOpenGlobalChat = () => {
    setSpeedDialOpen(false);
    setGlobalChatOpen(!globalChatOpen);
    setFactionChatOpen(false);
    setSquadChatOpen(false);
  };
  const handleOpenFactionChat = () => {
    setSpeedDialOpen(false);
    setGlobalChatOpen(false);
    setFactionChatOpen(!factionChatOpen);
    setSquadChatOpen(false);
  };

  return (
    <>
      {globalChatOpen && (
        <div className="chatContainer">
          <div class="card">
            <Grid
              container
              className={classes.chatHeader}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                Gamechat
              </Grid>
              <Grid item xs={2}>
                <CloseIcon onClick={() => setGlobalChatOpen(!globalChatOpen)}/>
              </Grid>
            </Grid>

            {!chatOpen && (
              <div>
                <div class="card-content chat-content">
                  <div class="content">
                    {chats
                      ?.filter(
                        (chat) =>
                          !chat.isHumanGlobal &&
                          !chat.isZombieGlobal &&
                          chat.gameId
                      )
                      .sort((a, b) => a.chatTime - b.chatTime)
                      .map((c, i) => (
                        <>
                          <div
                          key={c.id}
                            class={`chat-message-group ${
                              c.username === token.actort ? "writer-user" : ""
                            }`}
                          >
                            <div class="chat-messages">
                              <div class="from">{c.username}</div>
                              <div class="message">{c.message}</div>
                              <div class="from">
                                {moment(`${c.chatTime}`).format("HH:mm")}
                              </div>
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
            )}
          </div>
        </div>
      )}

      {factionChatOpen && (
        <div className="chatContainer">
          <div class="card">
            <Grid
              container
              className={classes.chatHeader}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                Factionchat
              </Grid>
              <Grid item xs={2}>
                <CloseIcon  onClick={() => setFactionChatOpen(!factionChatOpen)}/>
              </Grid>
            </Grid>

            {!chatOpen && (
              <div>
                <div class="card-content chat-content">
                  <div class="content">
                    {chats
                      ?.filter(
                        (chat) =>
                          chat.isHumanGlobal ||
                          (chat.isZombieGlobal && chat.gameId)
                      )
                      .sort((a, b) => a.chatTime - b.chatTime)
                      .map((c, i) => (
                        <>
                          <div
                          key={c.id}
                            class={`chat-message-group ${
                              c.username === token.actort ? "writer-user" : ""
                            }`}
                          >
                            <div class="chat-messages">
                              <div class="from">{c.username}</div>
                              <div class="message">{c.message}</div>
                              <div class="from">
                                {moment(`${c.chatTime}`).format("HH:mm")}
                              </div>
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
            )}
          </div>
        </div>
      )}

      {/* CHAT SPEED DIAL */}
      <Backdrop open={speedDialOpen} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<ForumIcon />}
        onClose={handleSpeedDialOpen}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>
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
