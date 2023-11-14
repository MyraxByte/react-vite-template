import { useModalStore } from '@/store/modal.store';
import { Button, Group, Stack, Text } from '@mantine/core';
import React from 'react';

type TConfirmModal = {
    onConfirm: (payload: any) => Promise<unknown>;
    text: (payload: any) => string | React.ReactNode;
    loading: boolean;
    children?: React.ReactNode;
};

export default function ConfirmModal({ onConfirm, text, loading, children }: TConfirmModal) {
    const payload = useModalStore((state) => state.payload);
    const setClose = useModalStore((state) => state.setClose);

    const handleSubmit = async () => {
        await onConfirm(payload);
        setClose();
    };

    return (
        <Stack gap={0}>
            <Stack gap={24} my={48}>
                {children || (
                    <Text ta={'center'} size={'13px'} fw={400}>
                        {text(payload)}
                    </Text>
                )}
            </Stack>
            <Group justify={'flex-end'} p={16}>
                <Button size="13px" h={32} variant="filled" onClick={handleSubmit} fw={500} loading={loading}>
                    Submit
                </Button>
                <Button size="13px" h={32} variant="default" onClick={setClose} fw={500} loading={loading}>
                    Cancel
                </Button>
            </Group>
        </Stack>
    );
}
