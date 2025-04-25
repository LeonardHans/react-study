import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchDetail = async ({ id, isTvShow }) => {
    const keyword = isTvShow ? 'tv' : 'movie';
    const [detail, reviews] = await Promise.all([
        api.get(`/${keyword}/` + id),
        api.get(`/${keyword}/` + id + '/reviews')
    ]);
    return { detail: detail?.data, reviews: reviews?.data};
}

export const useDetailQuery = ({ id, isTvShow }) => {
    return useQuery({
        queryKey: ['detail', { id, isTvShow }],
        queryFn: () => fetchDetail({ id, isTvShow }),
        select: (data) => {
            return { detail: data?.detail, reviews: data?.reviews }; 
        },
        retry: 3,
        retryDelay: (count) => {
            console.log('fetchDetail, retry', count);
            return Math.min(1000 * 2 ** count, 30000);
        },
        staleTime: 1000 * 60, // It is NOT requested for a minute.
        gcTime: 1000 * 60 * 5, // Cache is removed after 5 minutes.
        refetchOnMount: false, // It is NOT requested when the component is mounted.
        refetchOnWindowFocus: false, // It is NOT requested when the window is focused.
        // refetchInterval: 3000, should be requested every 3 seconds.
        // enabled: false, // It is NOT requested when the component is mounted.
        throwOnError: true,
    });
}