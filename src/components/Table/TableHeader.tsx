import clsx from 'clsx';
import styles from './styles.module.css';

type ITableHeaderProps = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

export default function TableHeader({ className, ...props }: ITableHeaderProps) {
    return <thead className={clsx(className, styles.table__header)} {...props} />;
}
