import clsx from 'clsx';
import styles from './styles.module.css';

type ITableProps = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;

export default function Table({ className, ...props }: ITableProps) {
    return <table className={clsx(className, styles.table)} {...props} />;
}
