import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"





export function CardTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className=" border-gray-200 text-center rounded-l-md text-white bg-[#121538]">N. Carta</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Imagen</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Nombre</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Idioma</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Tipo</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Edición</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Rareza</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">CMC</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Precio</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Estado</TableHead>
                <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Fecha</TableHead>
                <TableHead className=" border-gray-200 text-center rounded-r-md text-white bg-[#121538]">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

