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
    }
}))