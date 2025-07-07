import { ModalContentProps, ModalHeaderProps, ModalOverlayProps, ModalRootProps } from "@mantine/core";

import { TModalProps } from "./context";
import {ModalProvider} from "./ModalProvider";

type ModalSystemProps = {
    modals: TModalProps[];
    contentProps?: ModalContentProps;
    headerProps?: ModalHeaderProps;
    overlayProps?: ModalOverlayProps;
} & Omit<ModalRootProps, "opened" | "onClose" | "onTransitionEnd">;

export function ModalSystem({ modals, contentProps, headerProps, ...rest }: ModalSystemProps) {
	return modals.map((modal, index) => <ModalProvider key={index} withOverlay={!index} contentProps={contentProps} headerProps={headerProps} {...rest} {...modal} />);
}
