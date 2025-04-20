
import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function UserTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="border-gray-200 text-center  text-white bg-[#121538] rounded-l-md">Nombre</TableHead>
                <TableHead className="border-gray-200 text-center  text-white bg-[#121538]">Email</TableHead>
                <TableHead className="border-gray-200 text-center  text-white bg-[#121538]">Rol</TableHead>
                <TableHead className="border-gray-200 text-center  text-white bg-[#121538]">Último Ingreso</TableHead>
                <TableHead className="border-gray-200 text-center  text-white bg-[#121538] rounded-r-md">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}