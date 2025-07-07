import { Modals } from "@/constants/modals";
import { IStateSlice } from "@/store/store";

export interface IModal {
	open: boolean;
	trigger: Modals;
	order: number;
	title: string;
	payload?: any;
}

export interface IModalSystemState {
	modals: Array<IModal>;
    open: (trigger: Modals, state: Omit<IModal, "open" | "trigger" | "order">) => void;
    close: (trigger: Modals, remove?: boolean) => void;
    state: (trigger: Modals) => IModal | undefined;
}

export const createModalSystemStore: IStateSlice<IModalSystemState> = (set, get) => ({
	modals: [],
	open(trigger, state) {
		const modals = get().modalSystem.modals;
		const highestOrder = modals.reduce((acc, modal) => (modal.order > acc ? modal.order : acc), 0);

		const newModal = {
			...state,
			open: true,
			trigger,
			order: highestOrder + 1,
		};

		const sortedModals = [...modals, newModal].sort((a, b) => a.order - b.order);
		set((state) => {
			state.modalSystem.modals = sortedModals;
		});
	},
	close(trigger, remove = false) {
		const modals = get().modalSystem.modals;
		const filteredModals = modals.filter((modal) => modal.trigger === trigger);
		if (!filteredModals.length) return;

		const highestModal = filteredModals.sort((a, b) => b.order - a.order)[0];

		if (remove) {
			const newModals = modals.filter((modal) => modal.order !== highestModal.order && modal.trigger !== trigger);
			set((state) => {
				state.modalSystem.modals = newModals;
			});
		} else {
			const newModals = modals.map((modal) => {
				if (modal.order === highestModal.order && modal.trigger === trigger) {
					return { ...modal, open: false };
				}
				return modal;
			});
			set((state) => {
				state.modalSystem.modals = newModals;
			});
		}
	},
	state(trigger) {
		return get().modalSystem.modals.find((modal) => modal.trigger === trigger);
	},
});