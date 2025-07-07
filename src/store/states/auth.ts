import { ILoggedUser } from "@/features/login/interfaces/user";
import { IStateSlice } from "@/store/store";

export interface IAuthState {
    user: ILoggedUser | null;
    isAuthorized: boolean;

	setUser: (user: ILoggedUser | null) => void;
    setAuthorized: (isAuthorized: boolean) => void;
}

export const createAuthStore: IStateSlice<IAuthState> = (set) => ({
	user: null,
	isAuthorized: true,

	setUser: (user) => set((state) => {
		state.auth.user = user;
	}),
	setAuthorized: (isAuthorized) => set((state) => {
		state.auth.isAuthorized = isAuthorized;
	})
});
