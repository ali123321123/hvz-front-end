import React from 'react'
import GameListCard from './GameListCard'
import {useState} from 'react'

function GameList() {

    const [cards, setCards] = useState();

    return (
        <div>
            <GameListCard />
        </div>
    )
}

export default GameList
