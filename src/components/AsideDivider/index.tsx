import styles from './styles.module.css';
import { Divider, DividerProps } from '@mantine/core';

export default function AsideDivider(props: DividerProps) {
    return <Divider {...props} className={styles['aside-link__divider']} />;
}
