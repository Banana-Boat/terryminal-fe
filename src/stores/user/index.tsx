import { createStore } from "zustand/vanilla";
import { IUser } from "./types.js";
import { useStore } from "zustand";

interface IUserStore extends IUser {
  isLogin: boolean;
  toggleLoginState: (isLogin: boolean) => void;
  updateUserInfo: (user: IUser) => void;
  resetUser: () => void;
}

const userStore = createStore<IUserStore>((set) => ({
  id: 0,
  nickname: "",
  email: "",
  chatbotToken: 0,
  isLogin: false,
  toggleLoginState: (isLogin: boolean) => set({ isLogin }),
  updateUserInfo: (user: IUser) => set(user),
  resetUser: () => {
    set({
      id: 0,
      nickname: "",
      email: "",
      chatbotToken: 0,
      isLogin: false,
    });
  },
}));

const useUserStore = () => useStore(userStore);

export { userStore, useUserStore };
