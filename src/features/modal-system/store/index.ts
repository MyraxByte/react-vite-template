import type { StateCreator, StoreApi} from "zustand";
import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { isProd } from "@/constants/env";

import type { IModalSystemState } from "./modal-system";
import { createModalSystemStore } from "./modal-system";

const modalSystemStore = createStore<IModalSystemState>()(
	immer(
		devtools(createModalSystemStore, {
			enabled: !isProd(),
			name: "APP (DEV)"
		}),
	)
);

export function useModalStore<T>(selector: (state: IModalSystemState) => T) {
	return useStore(modalSystemStore, selector);
}

export function getModalStore() {
	return modalSystemStore.getState();
}

declare global {
  var modalStore: StoreApi<IModalSystemState>;
}

globalThis.modalStore = modalSystemStore;

export type IStateSlice<T> = StateCreator<IModalSystemState, [["zustand/immer", never]], [], T>;