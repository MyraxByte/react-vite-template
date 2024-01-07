import clsx from 'clsx';
import styles from './styles.module.css';

type ITableHeadProps = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;

export default function TableHead({ className, ...props }: ITableHeadProps) {
    return <th className={clsx(className, styles.table__head)} {...props} />;
}
