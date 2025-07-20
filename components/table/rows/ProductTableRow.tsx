import React, { useState } from 'react'
import { TableCell, TableRow, } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Image from "next/image";

import { IProductResponse } from '@/app/api/products/product.interface';

import StockModal from '@/components/modal/StockModal';


interface ProductTableRowProps {
    item: IProductResponse
    isSelected: boolean
    isExpanded: boolean
    onSelect: () => void
    onExpand: () => void
    handleActions: React.ReactNode
}

const formatDateTime = (dateString?: string) => {
    if (!dateString) return ""; // Maneja valores null o undefined

    const fecha = new Date(dateString);
    if (isNaN(fecha.getTime())) return "Fecha inválida"; // Verifica si es una fecha válida

    return `${fecha.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
            ${fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
};


export function ProductTableRow({ item, handleActions }: ProductTableRowProps) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [isStockModalOpen, setIsStockModalOpen] = useState(false); // Estado para controlar el modal de stock
    return (
        <React.Fragment>
            <TableRow>
                <TableCell className="border-r border-gray-100 px-2 text-left">{item.sku}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-center cursor justify-content-center align-items-center"
                    onClick={() => setIsModalOpen(true)}>
                    {item.images && item.images.length > 0 && item.images[0].url ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center border border-gray-300 shadow-lg shadow-gray-700 dark:shadow-gray-900 transition-transform duration-300 hover:scale-105 justify-content-center">
                            <Image
                                src={item.images[0].url}
                                alt={item.name || "Imagen de carta"}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full border-black border-2 rounded-full shadow-xl shadow-black-500/50 items-center"
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full flex justify-center items-center border border-gray-300 bg-gray-200">
                            <span>No Image</span>
                        </div>
                    )}
                </TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-left">{item.name}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-right">${item.price}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-right cursor" 
                onClick={() => setIsStockModalOpen(true)}
                ><span className='cursor hover:underline'>{item.stock}</span></TableCell>
                <TableCell className="border-r border-gray-100 px-8 text-left">
                    {item.categories.map(category => category.name).join(', ')}
                </TableCell>
                <TableCell className="border-r border-gray-100 px-8 text-right">{formatDateTime(item.created_at)}</TableCell>
                <TableCell className="justify-items-center px-8">
                    {handleActions}
                </TableCell>
            </TableRow>
            {isStockModalOpen && (
                <StockModal
                    data={item}
                    open={isStockModalOpen}
                    onOpenChangeAction={setIsStockModalOpen}
                />
            )}
        </React.Fragment>
    )
}