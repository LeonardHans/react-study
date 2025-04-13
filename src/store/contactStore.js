import { create } from "zustand";

const contactStore = create( (set) => ({
    contactBook: [],
    addContact: (name, number) => {
        set( (state) => {
            return { contactBook: [...state.contactBook, {name, number, id: Date.now()}] };
        })
    },
}))

export default contactStore;