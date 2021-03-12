import React from 'react'
import useSWR from 'swr'
import {fetcher} from '../../services/FetcherFunction'
import {useEffect} from 'react'

function Temp() {
    

    const {data, error} = useSWR("https://localhost:44390/api/Games", fetcher)

   
    console.log(data, error)

    

    return (

        <div>
          
        </div>
    )
}

export default Temp
