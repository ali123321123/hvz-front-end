import React from 'react'
import useSWR from 'swr'
import {fetcher} from '../../services/FetcherFunction'


function Temp() {
    

    const {data, error} = useSWR("https://localhost:44390/api/Games", fetcher)

   
    console.log(data, error)

    

    return (

        <div>
          {data && 
          <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default Temp
