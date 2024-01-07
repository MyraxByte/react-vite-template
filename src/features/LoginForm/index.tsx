import { Button, Card, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';

import useLoginForm from './hooks/useLoginForm';

import styles from '@/components/Input/input.module.css';

export default function LoginForm() {
    const { form, onSubmit } = useLoginForm();

    return (
        <form onSubmit={onSubmit}>
            <Card shadow={'sm'} radius={'md'} bg={'white'} style={{ overflow: 'visible' }}>
                <Card.Section inheritPadding py={36} px={32}>
                    <Group align="center" justify="center">
                        <Text size={'26px'} lh={'39px'} c={'dark.9'} fw={'500'}>
                            Sign In
                        </Text>
                    </Group>
                </Card.Section>

                <Card.Section inheritPadding px={32}>
                    <Stack gap={36}>
                        <Stack gap={36} w={372}>
                            <TextInput
                                label="Email"
                                placeholder="Enter your email"
                                classNames={{ input: styles.input, error: styles['input__error-message'] }}
                                {...form.getInputProps('email')}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Enter your password"
                                classNames={{ input: styles.input, error: styles['input__error-message'] }}
                                {...form.getInputProps('password')}
                            />
                        </Stack>

                        <Group justify="flex-end">
                            <Text size={'13px'} lh={'21px'} fw={'400'}>
                                {/* <Text span component={Link} to="/auth/forgot-password" c="accent.4">
                                    Forgot your password?
                                </Text> */}
                            </Text>
                        </Group>

                        <Stack>
                            <Button type="submit" variant="filled" radius={'sm'} h={40} size="14px" fullWidth>
                                Sign In
                            </Button>
                        </Stack>
                    </Stack>
                </Card.Section>

                <Card.Section inheritPadding pb={16} pt={16} px={32}>
                    {/* <Group py={16} align="center" justify="center">
                        <Text size={'13px'} lh={'21px'} c={'gray.6'} fw={'500'}>
                            Don't have an account?{' '}
                            <Text span component={Link} to="/auth/register" size={'13px'} lh={'21px'} c="accent.4" fw={'500'}>
                                Sign Up
                            </Text>
                        </Text>
                    </Group> */}
                </Card.Section>
            </Card>
        </form>
    );
}
