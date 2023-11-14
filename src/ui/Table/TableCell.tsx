import clsx from 'clsx';
import styles from './styles.module.css';

type ITableCellProps = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;

export default function TableCell({ className, ...props }: ITableCellProps) {
    return <td className={clsx(className, styles.table__cell)} {...props} />;
}
