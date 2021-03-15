import {useSWR} from 'swr'

export const getGames = useSWR("https://localhost:44390/api/Games", fetcher)