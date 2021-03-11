import React from 'react'
import GameListCard from './GameListCard'
import {useState, useEffect} from 'react'


function GameList() {

    const [games, setGames] = useState([]);
    const database = require('../../mockdata/mockDb.json')

    useEffect(() => {
        setGames(database.games);
    }, [])

    useEffect(() => {
        console.log(games)
    }, [games])



    return (
    
        <div>
            <h1>Active games</h1>
            {games && games.map(game => (
                <GameListCard key={game.id} game={game} />
            ))
            }
            
        </div>
    )
}

export default GameList
