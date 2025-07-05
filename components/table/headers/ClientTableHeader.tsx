import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function ClientTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido</TableHead>
                <TableHead className="text-center">Empresa</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Teléfono</TableHead>
                <TableHead className="text-center">Ciudad</TableHead>
                <TableHead className="text-center">Dirección</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Puntos</TableHead>
                <TableHead className="text-center">Max Crédito</TableHead>
                <TableHead className="text-center">Creado</TableHead>
                <TableHead className="text-center">Actualizado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

