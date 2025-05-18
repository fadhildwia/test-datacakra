/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
  token?: string;
  userAuth: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  logout: () => void;
  setUserAuth: (user: any) => void;
  setErrorMessage: (msg: string | null) => void;
  setIsLoading: (val: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      userAuth: null,
      isAuthenticated: false,
      isLoading: false,
      errorMessage: null,

      logout: () => {
        set({
          token: undefined,
          userAuth: null,
          isAuthenticated: false,
        });
      },

      setUserAuth: (user) => set({ userAuth: user?.user, token: user?.jwt, isAuthenticated: true }),
      setErrorMessage: (msg) => set({ errorMessage: msg }),
      setIsLoading: (val) => set({ isLoading: val }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        token: state.token,
        userAuth: state.userAuth,
        isAuthenticated: state.userAuth ? true : false
      }),
    }
  )
);


export default useAuthStore;
