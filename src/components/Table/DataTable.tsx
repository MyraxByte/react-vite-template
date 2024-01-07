import Table from '@/components/Table/Table';
import TableBody from '@/components/Table/TableBody';
import TableCell from '@/components/Table/TableCell';
import TableHead from '@/components/Table/TableHead';
import TableHeader from '@/components/Table/TableHeader';
import TableRow from '@/components/Table/TableRow';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface ITableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
}

export default function DataTable<TData, TValue>(props: ITableProps<TData, TValue>) {
    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleClick = (row: any) => {
        if (!props.onRowClick) return;
        props.onRowClick(row.original);
    };

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} onClick={props.onRowClick ? handleClick : undefined}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
