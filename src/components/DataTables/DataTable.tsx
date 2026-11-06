import { useState, useEffect, useCallback } from 'react';
import type { Column, ApiResponse, BaseQueryParams, SortDirection } from './types';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Typography, Alert, TablePagination } from '@mui/material';

// 1. Add externalFilters to the Props interface
export interface DataTableProps<T, TParams extends BaseQueryParams> {
    columns: Column<T>[];
    fetchData: (params: TParams) => Promise<ApiResponse<T>>;
    initialPageSize?: number;
    initialSortColumn?: string;
    initialSortDirection?: SortDirection;
    externalFilters?: Record<string, any>; // <-- Added this property
}


export function DataTable<T extends Record<string, any>, TParams extends BaseQueryParams>({
    columns,
    fetchData,
    initialPageSize = 10,
    initialSortColumn = columns[0]?.key || '',
    initialSortDirection = 'asc',
    externalFilters = {}, // Default to empty object
}: DataTableProps<T, TParams>) {
    const [data, setData] = useState<T[]>([]);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Pagination & Sorting State
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [sortColumn, setSortColumn] = useState<string>(initialSortColumn);
    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

    // Whenever externalFilters changes (i.e. parent search button clicked), reset to page 1
    useEffect(() => {
        setPageNumber(1);
    }, [externalFilters]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                pageNumber,
                pageSize,
                sortColumn,
                sortDirection,
                ...externalFilters, // Spread parent filters
            } as unknown as TParams;

            const response = await fetchData(params);
            setData(response.data);
            setTotalRows(response.totalRows);
        } catch (err: any) {
            setError(err?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [fetchData, pageNumber, pageSize, sortColumn, sortDirection, externalFilters]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSort = (columnKey: string, sortable?: boolean) => {
        if (!sortable) return;
        if (sortColumn === columnKey) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
        setPageNumber(1);
    };

    const totalPages = Math.ceil(totalRows / pageSize) || 1;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPageNumber(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(1);
    };

    return (
        <>
            <TableContainer sx={{
                maxHeight: 440, 
                overflowY: "auto",
                overflowX: 'auto', 
                boxShadow: 2,
                borderRadius: 0,
                border: '1px solid rgba(0, 0, 0, 1)'
            }} >
                <Table stickyHeader aria-label="enhanced data table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col, colIndex) => (
                                <TableCell
                                    key={col.key}
                                    sortDirection={sortColumn === col.key ? sortDirection : false}
                                    // sx={{ backgroundColor: 'grey.100', fontWeight: 'bold' }}
                                    sx={{
                                        backgroundColor: 'blueAccent.500',
                                        fontWeight: 'bold',
                                        // Add a right border to all columns except the last one
                                        borderRight: colIndex < columns.length - 1 ? '1px solid rgba(0, 0, 0, 1)' : 'none',
                                        borderBottom: '1px solid rgba(0, 0, 0, 1)',
                                        width: col.width,       
                                        minWidth: col.minWidth, 
                                    }}
                                >
                                    {col.sortable ? (
                                        <TableSortLabel
                                            active={sortColumn === col.key}
                                            direction={sortColumn === col.key ? sortDirection : 'asc'}
                                            onClick={() => handleSort(col.key, col.sortable)}
                                        >
                                            {col.header}
                                        </TableSortLabel>
                                    ) : (
                                        col.header
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {error ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    sx={{
                                        p: 0,
                                        display: 'table-cell',
                                        width: '100%'
                                    }}
                                >
                                    <Alert
                                        severity="error"
                                        sx={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            borderRadius: 0,
                                            py: 2
                                        }}
                                    >
                                        {error}
                                    </Alert>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 && !loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No records found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow
                                    hover
                                    key={row.mUSEUM_ID ?? rowIndex}
                                    sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                                >
                                    {columns.map((col, colIndex) => (
                                        <TableCell key={col.key}
                                            sx={{
                                                borderRight: colIndex < columns.length - 1 ? '1px solid rgba(0, 0, 0, 1)' : 'none',
                                                borderBottom: '1px solid rgba(0, 0, 0, 1)',
                                                width: col.width,       
                                                minWidth: col.minWidth, 
                                            }}
                                        >
                                            {col.render ? col.render(row) : row[col.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MUI Pagination Footer */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={totalRows}
                rowsPerPage={pageSize}
                page={pageNumber - 1} // Convert 1-indexed to 0-indexed for MUI
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>

    );
}