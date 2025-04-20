import React from "react";

export interface Column<T> {
    label: string;
    key: Exclude<keyof T, '_id'>;
    filterable?: boolean;
    sortable?: boolean;
    cell?: (value: unknown, row: T) => React.ReactNode;
    actions?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    itemsPerPage?: number;
    isLoading: boolean;
    error: string | null;
    actions?: (item: T) => React.ReactNode;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface FilterProps<T> {
    columns: Column<T>[];
    filters: Record<string, string>;
    onFilterChange: (filters: Record<string, string>) => void;
    data: T[];
}

export interface SortProps<T> {
    column: Column<T>;
    sortColumn: keyof T | null;
    sortDirection: 'asc' | 'desc';
    onSort: (column: keyof T) => void;
}

export const getUniqueValues = <T, K extends keyof T>(data: T[], accessor: K): string[] => {
    return Array.from(new Set(
        data
            .map(item => item[accessor])
            .filter((value): value is NonNullable<typeof value> =>
                value !== null && value !== undefined && value !== '')
            .map(String)
    ));
};
