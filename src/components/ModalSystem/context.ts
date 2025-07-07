import { createContext, useContext } from "react";
import { ModalContentProps, ModalHeaderProps, ModalOverlayProps, ModalRootProps } from "@mantine/core";

import { Modals } from "@/constants/modals";
import { IModal } from "@/store/states/modal-system";

export type TModalProps = {
	trigger: Modals;
	component: () => React.ReactNode;
	contentProps?: ModalContentProps;
	headerProps?: ModalHeaderProps;
	overlayProps?: ModalOverlayProps;
	withOverlay?: boolean;
} & Omit<ModalRootProps, "opened" | "onClose" | "onTransitionEnd">;

export interface IModalContext<T> {
	trigger: TModalProps["trigger"];
	payload: T;
	close: () => void;
}

export const ModalContext = createContext({} as IModalContext<IModal["payload"]>);

export function useModalContext<T>() {
	return useContext(ModalContext) as IModalContext<T>;
}