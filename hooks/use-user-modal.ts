import { create } from "zustand";

type CardModalUser = {
  isOpenUser: boolean;
  onOpenUser: () => void;
  onCloseUser: () => void;
};

export const userUserModal = create<CardModalUser>((set) => ({
    isOpenUser: false,
    onOpenUser: () => {
        console.log('debug says successful')
        set({ isOpenUser: true,})
    },
    onCloseUser: () => {
        console.log('debug says unsuccessful')
        set({ isOpenUser: false})
    }
}));
