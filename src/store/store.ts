import { createStore, StateCreator, StoreApi } from "zustand";
import { useStore as useZustandStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { isProd } from "@/constants/env";
import { createAuthStore, IAuthState } from "@/store/states/auth";
import { createModalSystemStore, IModalSystemState } from "@/store/states/modal-system";

export interface IStore {
	auth: IAuthState;
	modalSystem: IModalSystemState
}

export const store = createStore<IStore>()(
	immer(
		devtools(
			(...a) => ({
				auth: createAuthStore(...a),
				modalSystem: createModalSystemStore(...a),
			}),
			{ enabled: !isProd(), name: "APP (DEV)" },
		),
	),
);

export function useStore<T>(selector: (state: IStore) => T) {
	return useZustandStore(store, selector);
}

export function getStore() {
	return store.getState();
}

declare global {
  var store: StoreApi<IStore>;
}

globalThis.store = store;

export type IStateSlice<T> = StateCreator<IStore, [["zustand/immer", never]], [], T>;