import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"





export function ProductTableHeader() {
    return (
        <TableHeader>
            <TableRow>
            <TableHead className="border-gray-200 text-center rounded-l-md text-white bg-[#121538]">SKU</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Imagen</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Nombre</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Precio</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Stock</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Categorías</TableHead>
                <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Fecha de Creación</TableHead>
                <TableHead className="border-gray-200 text-center rounded-r-md text-white bg-[#121538]">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

