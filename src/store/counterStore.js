import { create } from "zustand";

const counterStore = create( (set) => ({
    upperbound: 10000,
    lowerbound: 0,
    reset: () => set( (state) => {
        state.initTarget();
        return  { score: 0, count: 1};
    }),

    target: -1,
    initTarget: (val) => set( () => ({ target: Math.round(Math.random() * 10000) })),

    score: 0,
    increaseScore: () => set( (state) => ({ score: state.score + 1 })),

    count: 1,
    increaseCount: (val) => {
        set( (state) => {
            if (state.upperbound < state.count + val) {
                return {count: state.upperbound};
            }
            else {
                return {count: state.count + val};
            }
        })
    },
    decreaseCount: (val) => {
        set( (state) => {
            if (state.count - val < state.lowerbound) {
                return {count: state.lowerbound};
            }
            else {
                return {count: state.count - val};
            }
        })
    },
    multiplyCount: (val) => {
        set( (state) => {
            if (state.upperbound < state.count * val) {
                return {count: state.upperbound};
            }
            else {
                return {count: state.count * val};
            }
        })
    },
    divideCount: (val) => {
        if (val === 0) {
            alert('Unknown Critcal Issue!!')
        }
        else {
            set( (state) => {
                if (state.count / val < state.lowerbound) {
                    return {count: state.lowerbound};
                }
                else {
                    return {count: Math.round(state.count / val)};
                }
            })
        }
    },
}));

export default counterStore;