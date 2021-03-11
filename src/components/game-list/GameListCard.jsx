import React from 'react'
import {useEffect} from 'react'

function GameListCard(prop) {

    useEffect(() => {
        console.log(prop)
        
    }, [])

    return (
        <div>
            <h1>{prop.game.name}</h1>
        </div>
    )
}

export default GameListCard
