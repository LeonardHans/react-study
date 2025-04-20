import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularTvShows = () => {
    return api.get(`/tv/popular`);
}

export const usePopularTvShowsQuery = () => {
    return useQuery({
        queryKey: ['tv-show-popular'],
        queryFn: fetchPopularTvShows,
        retry: 3,
        retryDelay: (count) => {
            console.log('fetchPopularTvShows, retry', count);
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