import { isEqual } from 'radash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IModalStore {
    open: boolean;
    type?: string;
    trigger: string | number;
    title: string;
    payload?: any;
    setOpen: (properties: Pick<IModalStore, 'trigger' | 'type' | 'title' | 'payload'>) => void;
    setClose: () => void;
    reset: () => void;
}

const InitialState: Omit<IModalStore, "setOpen" | "setClose" | "reset"> = {
    open: false,
    type: 'create',
    title: '',
    trigger: '',
    payload: null
};

export const useModalStore = create<IModalStore>()(
    devtools(
        (set, get) => ({
            ...InitialState,
			setOpen: (properties) => {
                set({ open: true, ...properties }, false, 'setOpen');
            },
            setClose: () => set({ open: false }, false, 'setClose'),
			reset: () => {
				if (isEqual(InitialState, get())) return;
				set(InitialState, false, 'reset')
			},
        }),
        { name: 'Modal' }
    )
);
