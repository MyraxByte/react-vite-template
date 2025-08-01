import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Modal as ModalBase } from "@mantine/core";

import type { Modals } from "@/features/modal-system/modals";
import type { IModal } from "@/features/modal-system/store/modal-system";

import type { IModalContext, TModalProps } from "../context";
import { ModalContext } from "../context";
import { useModalStore } from "../store";


function ClearState({ trigger }: { trigger: Modals }) {
	const close = useModalStore((state) => state.close);
	const open =  useModalStore((state) => state.state(trigger)?.open);

	useEffect(() => {
		return () => {
			if (open) return;
			close(trigger, true);
		};
	}, [open, close, trigger]);

	return null;
}


export function ModalProvider({ trigger, component: Component, contentProps, withOverlay, headerProps, overlayProps, ...rest }: TModalProps) {
	const close = useModalStore((state) => state.close);
	const opened = useModalStore((state) => state.state(trigger)?.open);
	const state = useModalStore((state) => state.state(trigger));

	return (
		<ModalBase.Root
			opened={opened || false}
			keepMounted={false}
			closeOnEscape={false}
			closeOnClickOutside={false}
			onClose={() => close?.(trigger)}
			classNames={{ root: `z-[${state?.order ?? 1}]`, inner: "absolute" }}
			{...rest}
		>
			{withOverlay && <ModalBase.Overlay className="absolute" backgroundOpacity={0.15} blur={1} {...overlayProps} />}
			<ModalBase.Content className="rounded-lg shadow-lg shadow-black/25" classNames={{ content: "bg-gray-800 border border-gray-700" }} miw={"fit-content"} {...contentProps}>
				<ClearState trigger={trigger} />
				<ModalBase.Header
					className="min-h-fit pl-6 py-4 overflow-hidden rounded-t-lg bg-gray-800 border-b border-gray-700"
					{...headerProps}
				>
					<div className="flex flex-row items-center gap-6 w-full h-6">
						<h1 className="text-sm font-semibold text-white">{state?.title}</h1>
						<div className="ml-auto gap-6">
							<button
								onClick={() => close(trigger, false)}
								className="rounded-lg p-3 text-white/75 flex items-center justify-center transition-colors hover:text-white cursor-pointer"
							>
								<Icon icon="fluent:dismiss-16-filled" fontSize={18} />
							</button>
						</div>
					</div>
				</ModalBase.Header>
				<ModalBase.Body className="overflow-auto rounded-b-lg p-0 ">
					<ModalContext.Provider value={{ trigger, payload: state?.payload as unknown, close: () => close(trigger, false) } as IModalContext<IModal["payload"]> }>
						<Component />
					</ModalContext.Provider>
				</ModalBase.Body>
			</ModalBase.Content>
		</ModalBase.Root>
	);
}
