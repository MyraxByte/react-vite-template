import clsx from 'clsx';
import styles from './styles.module.css';

type ITableBodyProps = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

export default function TableBody({ className, ...props }: ITableBodyProps) {
    return <tbody className={clsx(className, styles.table__body)} {...props} />;
}
