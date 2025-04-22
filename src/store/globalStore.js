import { create } from "zustand";

export const globalStore = create( (set) => ({
    keyword: "",
    setKeyword: (keyword) => set(() => ({ keyword })),

    tvShowGenres: {},
    movieGenres: {},
    tvShowGenresLoaded: false,
    movieGenresLoaded: false,
    setTvShowGenres: (tvShowGenres) => set(() => ({ tvShowGenres, tvShowGenresLoaded: true })),
    setMovieGenres: (movieGenres) => set(() => ({ movieGenres, movieGenresLoaded: true })),
    getGenres: (id, isTvShow) => {
        return isTvShow ? globalStore.getState().tvShowGenres?.[id] : globalStore.getState().movieGenres?.[id];
    },
    AreLoadedGenres: () => {
        return globalStore.getState().tvShowGenresLoaded && globalStore.getState().movieGenresLoaded;
    },

    responsive: undefined,
    getResponsive: () => {
        if (globalStore.getState().responsive) {
            return globalStore.getState().responsive;
        }

        const itemWidth = 220;
        const startWidth = 680;
        let responsive = {
            0: {
                breakpoint: { max: startWidth, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        for (let i = 1; i <= 6; ++ i) {
            responsive[i] = {
                breakpoint: { max: startWidth + (i * itemWidth), min: startWidth + ((i - 1) * itemWidth) },
                items: i + 1,
                slidesToSlide: i + 1 // optional, default to 1.
            }
        }

        set(() => ({ responsive }));

        console.log('init responsive', responsive);
        return responsive;
    }
}))