import { useModalStore } from '@/store/modal.store';
import { Icon } from '@iconify/react';
import { ActionIcon, Group, Modal as ModalBase, ModalRootProps, Text } from '@mantine/core';
import React, { useEffect } from 'react';

type ModalProps = {
    children: React.ReactNode[] | React.ReactNode;
    triggers: (string | number)[];
} & Omit<ModalRootProps, 'opened' | 'onClose' | 'onTransitionEnd'>;

function ClearState() {
    const open = useModalStore((state) => state.open);
    const reset = useModalStore((state) => state.reset);

    useEffect(() => {
        return () => {
            !open && reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return null;
}

export default function Modal({ children, triggers, ...rest }: ModalProps) {
    const open = useModalStore((state) => state.open);
    const title = useModalStore((state) => state.title);
    const trigger = useModalStore((state) => state.trigger);
    const setClose = useModalStore((state) => state.setClose);

    const opened = open && triggers.includes(trigger);

    return (
        <ModalBase.Root keepMounted={false} opened={opened} onClose={setClose} {...rest}>
            <ModalBase.Overlay backgroundOpacity={0.75} />
            <ModalBase.Content radius={'md'} miw={600} bg={'dark.6'}>
                <ClearState />
                <ModalBase.Header py={0} h={48} px={16} bg={'dark.7'}>
                    <Group align="center" gap={24} w={'100%'}>
                        <Text size={'13px'} fw={500} c="text.1" ff={'Poppins'}>
                            {title}
                        </Text>

                        <Group gap={24} ml={'auto'}>
                            <ActionIcon variant="default" onClick={setClose} radius={8} c={'text.4'} size={28}>
                                <Icon icon="fluent:dismiss-12-filled" fontSize={14} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </ModalBase.Header>
                <ModalBase.CloseButton size={24} pos={'absolute'} style={{ right: 16, top: 16 }} />
                <ModalBase.Body p={0}>{children}</ModalBase.Body>
            </ModalBase.Content>
        </ModalBase.Root>
    );
}
