import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  user: {
    token: "",
    avatar: "",
    fullname: "Yassi",
    id: "",
    status: "",
    isWithCredentials: false,
  },
  setUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
  removeUser: () =>
    set(() => ({
      user: {
        token: "",
        avatar: "",
        fullname: "",
        id: "",
        status: "",
        isWithCredentials: "",
      },
    })),
});
store = devtools(store);
store = persist(store, { name: "user" });
export const useStore = create(store);

let storeIsLoginModal = (set) => ({
  isLoginModal: false,
  setIsLoginModal: (value) => set({ isLoginModal: value }),
});
storeIsLoginModal = devtools(storeIsLoginModal);

export const useStoreLoginModal = create(storeIsLoginModal);
// const user = useStore((state) => state.user);
// const setUser = useStore((state) => state.setUser);

// const isLoginModal = useStoreLoginModal((state) => state.isLoginModal);
// const setIsLoginModal = useStoreLoginModal((state) => state.setIsLoginModal);
