import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResponseAuthLogin } from "@/apis/auth/auth.type";

// interface UserInfo extends Omit<ResponseAuthLogin, 'exp' | 'token'> { }
// interface TokenInfo { token: string, exp: number }


interface IStoreProps {
  userInfo?: ResponseAuthLogin;
  setUserInfo: (info: ResponseAuthLogin) => void;
  currentUserId: number;
  setCurrentUserId: (id: number) => void;
  getToken: () => string

}

const useAuthStore = create<IStoreProps>()(
  persist(
    (set, get) => ({
      userInfo: null,
      currentUserId: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
      setCurrentUserId: (userId) => set(() => ({ currentUserId: userId })),
      getToken: () => get().userInfo?.token || ''
    }),
    {
      name: "userInfo",
    }
  )
);

export default useAuthStore