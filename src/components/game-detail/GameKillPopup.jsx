import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getTokenInStorage } from "../../utils/tokenHelper";
import "../game-list/CardStyles.scss";
import GameDetailInteractiveMap from "./GameDetailInteractiveMap";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../map/Map";


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
            dialogPaper: {
                width: '40%'
            },
            gameDetailMap: {
                width: '80%%'
            },
            form: {
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
    const handleClickKill = (e) => {
        let data = {
            tod: 0,
            isVisible: killVisable,
            story: killStory,
            lat: 0,
            lng: 0,
            gameId: game.id,
            killerId: player.id,
            biteCode: killCode
        };
        console.log(data);
        /*
        fetch(`${Endpoints.KILLS_API}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getTokenInStorage(),
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json().then((res) => console.warn("result", res)));
        */
    }
    // MAP


    const [playAreaCoordinates, setPlayAreaCoordinates] = useState([]);
    useEffect(() => {
        setPlayAreaCoordinates([
            [game.nW_lat, game.nW_lng],
            [game.sE_lat, game.sE_lng],
          ]);
    })
    /*
    const [position, setPosition] = useState(null);
 
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setMarkerPosition(e.latlng);
      },
    });
    */





    const classes = useStyles();
    return (
        <div class="root">
            <Dialog classes={{ paper: classes.dialogPaper }} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Enter Bite Code
                </DialogTitle>

                <div className="gameDetailMap">
            <GameDetailInteractiveMap
              playAreaCoordinates={playAreaCoordinates}
            
            />
          </div>

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
                        label="Visable"
                    />
                    <br></br>
                    <TextField
                        label="Bite Code" // BiteCode
                        value={killCode}
                        onInput={e => setKillCode(e.target.value)}>
                    </TextField>
                    <br></br>
                    <TextField //Story
                        label="Story"
                        value={killStory}
                        onInput={e => setKillStory(e.target.value)}>
                    </TextField>
                    <br></br>

                </form>
                <Button
                    onClick={handleClickKill}
                    variant="outlined"
                    color="secondary">
                    Kill
                </Button>

                <Button autoFocus onClick={handleClose}
                    color="secondary"
                    variant="outlined">
                    Close
          </Button>
            </Dialog>
        </div>
    )
}
export default GameKillPopup;
