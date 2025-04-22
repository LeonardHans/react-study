import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const url = '/discover/movie' +
        '?include_adult=false' +
        '&include_video=false' +
        '&language=en-US' +
        '&release_date.gte=2010-01-01' +
        '&sort_by=popularity.desc' +
        '&vote_average.gte=8' +
        '&vote_count.gte=100';

const fetchSearch = ({ keyword, page }) => {
    return keyword ? 
    api.get(`/search/movie?query=${keyword}&page=${page}`) 
    : api.get(url + `&page=${page}`);
}

export const useSearchQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['movie-search', { keyword, page }],
        queryFn: () => fetchSearch({ keyword, page }),
        retry: 3,
        retryDelay: (count) => {
            console.log('fetchSearch, retry', count);
            Math.min(1000 * 2 ** count, 30000)
        },
        staleTime: 1000 * 60, // It is NOT requested for a minute.
        gcTime: 1000 * 60 * 5, // Cache is removed after 5 minutes.
        refetchOnMount: false, // It is NOT requested when the component is mounted.
        refetchOnWindowFocus: false, // It is NOT requested when the window is focused.
        // refetchInterval: 3000, should be requested every 3 seconds.
        // enabled: false, // It is NOT requested when the component is mounted.
        throwOnError: true,
    })
}