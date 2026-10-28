// types.ts
export type SortDirection = 'asc' | 'desc';

// Generic API Params that extends your model or allows dynamic indexing
export interface BaseQueryParams {
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;
  [key: string]: any; // Allows custom properties like mUSEUM_NAME, cITY, etc.
}

export interface ApiResponse<T> {
  data: T[];
  totalRows: number;
}

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string | number,
  minWidth?: string | number,
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T, TParams extends BaseQueryParams> {
  columns: Column<T>[];
  fetchData: (params: TParams) => Promise<ApiResponse<T>>;
  initialPageSize?: number;
  initialParams?: Partial<TParams>;
}