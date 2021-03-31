import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getTokenInStorage } from "../../utils/tokenHelper";
import "../game-list/CardStyles.scss";
import Map from "../map/Map";
import MapAddMarker from "../map/MapAddMarker";
import SendIcon from '@material-ui/icons/Send';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { light } from "../shared/themeGameCards";


import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@material-ui/core";
import Endpoints from '../../services/endpoints';

const GameKillPopup = ({ player, game, open, setOpen }) => {

    const useStyles = makeStyles((theme) =>
        createStyles({
            typography: {
                margin: 'auto'
            },
            button: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 48,
                padding: '0 30px',
                minWidth: '60%',
                margin: 'auto'
            },
            container: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '25pc',
                },
            },
        }),
    );
    // Open and close popup
    const handleClose = () => {
        setOpen(false);
    };

    // Handle KIll
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKillVisable(event.target.checked);
    };

    const [killCode, setKillCode] = useState('');
    const [killStory, setKillStory] = useState('');
    const [killVisable, setKillVisable] = useState(true);
    const [markerPosition, setMarkerPosition] = useState([])

    const handleClickKill = (e) => {
        let data = {
            tod: "2021-03-30T09:14:18.8859646",
            isVisible: killVisable,
            story: killStory,
            lat: markerPosition.lat,
            lng: markerPosition.lng,
            gameId: game.id,
            killerId: player.id,
            biteCode: killCode
        };
        console.log(data);
        console.log(markerPosition);

        fetch(`${Endpoints.KILLS_API}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getTokenInStorage(),
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json().then((res) => console.warn("result", res)));
        window.confirm("Player Killed!");

    }



    const classes = useStyles();
    return (
        <div>
            <MuiThemeProvider theme={light}>
                <CssBaseline />

                <Dialog classes={ classes.root } aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle 
                    style={{margin:"auto"}} 
                    onClose={handleClose}>
                        Register New Kill
                </DialogTitle>

                {game && (
                    <DialogContent style={{ height: "20em" }}>
                        <Map center={[(game.nW_lat + game.sE_lat) / 2, (game.nW_lng + game.sE_lng) / 2]} scrollWheelZoom={true}>
                            <MapAddMarker setMarkerPosition={setMarkerPosition} />
                        </Map>
                    </DialogContent>
                )}
                    
                <Typography style={{margin:"auto"}}>
                
                    Click on map to mark kill location
                </Typography>

                <form className={classes.container}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={killVisable}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Kill Visable"
                    />
                    <br></br>
                    <TextField
                        required
                        id="killCode"
                        label="Kill Code"
                        onInput={e => setKillCode(e.target.value)}
                        value={killCode}
                        variant="outlined"

                    />
                    <br></br>
                    <TextField //Story
                        label="Story"
                        value={killStory}
                        onInput={e => setKillStory(e.target.value)}
                        variant="outlined"
                    />
                    <br></br>

                </form>
                <Button className={classes.button}
                    onClick={handleClickKill}
                    variant="outlined"
                    color="secondary"
                    endIcon={<SendIcon />}
                >
                    Kill
                </Button>
                    <br></br>
                    <Button className={classes.button}
                        autoFocus 
                        onClick={handleClose}
                        color="secondary"
                        variant="outlined">
                        Close
                </Button>
                <br></br>
                </Dialog>
            </MuiThemeProvider>
        </div>
    )
}
export default GameKillPopup;
