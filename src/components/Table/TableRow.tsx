import styles from './styles.module.css';
import clsx from 'clsx';

type ITableRowProps = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

export default function TableRow({ className, onClick, ...props }: ITableRowProps) {
    return <tr className={clsx(className, styles.table__row)} style={{ cursor: onClick && 'pointer' }} {...props} />;
}
