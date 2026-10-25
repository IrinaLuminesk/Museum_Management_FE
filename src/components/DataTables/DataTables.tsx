import { useState, useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

type SortDirection = "asc" | "desc";

export type ServerPage<T> = {
    rows: T[];
    totalRows: number;
};

export type FetchArgs = {
    pageIndex: number;
    pageSize: number;
    sorting: SortingState;
};

type ServerDataTableProps<TData extends object> = {
    columns: ColumnDef<TData, any>[];
    fetchData: (args: FetchArgs) => Promise<ServerPage<TData>>;
    pageSize?: number;
    initialSorting?: SortingState;
    getRowKey?: (row: TData) => string;
};

export function ServerDataTable<TData extends object>({
    columns,
    fetchData,
    pageSize = 10,
    initialSorting = [],
    getRowKey,
}: ServerDataTableProps<TData>) {
    const [data, setData] = useState<TData[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [pageIndex, setPageIndex] = useState(0);
    const [sorting, setSorting] = useState<SortingState>(initialSorting);

    const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            setIsLoading(true);
            try {
                const result = await fetchData({
                    pageIndex,
                    pageSize,
                    sorting,
                });

                if (!ignore) {
                    setData(result.rows);
                    setTotalRows(result.totalRows);
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, [pageIndex, pageSize, sorting, fetchData]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true,
        manualPagination: true,
        state: {
            sorting,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onSortingChange: (updater) => {
            const next = typeof updater === "function" ? updater(sorting) : updater;
            setSorting(next);
            setPageIndex(0);
        },
        getRowId: (row) => getRowKey?.(row) ?? String((row as any).id ?? Math.random()),
    });

    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex >= pageCount - 1;

    return (
        <div style={{ width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{
                                        textAlign: "left",
                                        padding: "10px 12px",
                                        borderBottom: "1px solid #e5e7eb",
                                        cursor: header.column.getCanSort() ? "pointer" : "default",
                                        userSelect: "none",
                                    }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && " ↑"}
                                        {header.column.getIsSorted() === "desc" && " ↓"}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                No rows found
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        style={{ padding: "10px 12px", borderBottom: "1px solid #f3f4f6" }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 16,
                    gap: 12,
                }}
            >
                <div>
                    Showing {data.length} of {totalRows} rows
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                        disabled={isFirstPage || isLoading}
                        onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                    >
                        Previous
                    </button>

                    <span>
                        Page {pageIndex + 1} / {pageCount}
                    </span>

                    <button
                        disabled={isLastPage || isLoading}
                        onClick={() => setPageIndex((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}