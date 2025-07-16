import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function ClientTableHeader() {
    return (
        <TableHeader>
            <TableRow className="bg-gray-100">
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido</TableHead>
                <TableHead className="text-center">Empresa</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Teléfono</TableHead>
                <TableHead className="text-center">Ciudad</TableHead>
                <TableHead className="text-center">Dirección</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

