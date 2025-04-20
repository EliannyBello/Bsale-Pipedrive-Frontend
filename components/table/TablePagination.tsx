import React from 'react'
import {Button} from "@/components/ui/button"
import {IMeta} from "@/app/api/common/interface/apiResponse.interface";

interface TablePaginationProps {
    meta: IMeta
    onPageChange: (page: number) => void
}

export function TablePagination({meta, onPageChange}: TablePaginationProps) {
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, Number(meta.currentPage) - halfVisiblePages);
        const endPage = Math.min(meta.totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) startPage = Math.max(1, endPage - maxVisiblePages + 1);
        if (startPage > 1) {
            items.push(
                <Button
                    key="first"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    className="px-2 py-1"
                >
                    1
                </Button>
            );
            if (startPage > 2) {
                items.push(<span key="ellipsis-start">...</span>);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Button
                    key={i}
                    variant={i === Number(meta.currentPage) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    className="px-2 py-1"
                >
                    {i}
                </Button>
            );
        }
        if (endPage < meta.totalPages) {
            if (endPage < meta.totalPages - 1) items.push(<span key="ellipsis-end">...</span>);
            items.push(
                <Button
                    key="last"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(meta.totalPages)}
                    className="px-2 py-1"
                >
                    {meta.totalPages}
                </Button>
            );
        }
        return items;
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Mostrando {meta.itemsPerPage} de {meta.totalItems} resultados
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, +meta.currentPage - 1))}
                    disabled={+meta.currentPage === 1}
                >
                    Anterior
                </Button>
                {renderPaginationItems()}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(meta.totalPages, +meta.currentPage + 1))}
                    disabled={+meta.currentPage === meta.totalPages}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}