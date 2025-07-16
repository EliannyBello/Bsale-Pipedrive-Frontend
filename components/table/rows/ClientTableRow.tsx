import React from 'react'
import { TableCell, TableRow } from "@/components/ui/table"
import { IClientResponse } from '@/app/api/clients/client.interface'
import { Badge } from "@/components/ui/badge"

interface ClientTableRowProps {
    item: IClientResponse
    handleActions?: React.ReactNode
}



export function ClientTableRow({ item, handleActions }: ClientTableRowProps) {

    const stateVariants: Record<string, "warning" | "success" | "secondary" | "destructive" | "outline"> = {
    "Pendiente": "warning",    // Amarillo
    "Completado": "success",   // Verde
    "Registrado": "secondary",  // Azul
    "Fallido": "destructive",  // Rojo
    "Parcial": "warning", 
};

    return (
        <TableRow className="hover:bg-gray-50 transition-colors text-xs">
            <TableCell className="py-2 font-medium text-gray-700">{item.id}</TableCell>
            <TableCell className="py-2 text-gray-700">{item.firstName}</TableCell>
            <TableCell className="py-2 text-gray-700">{item.lastName}</TableCell>
            <TableCell className="py-2 text-gray-700">{item.company || <span className="text-gray-400 italic">Sin empresa</span>}</TableCell>
            <TableCell className="py-2 text-gray-700">
            <a href={`mailto:${item.email}`} className="underline hover:text-blue-600 transition-colors">{item.email}</a>
            </TableCell>
            <TableCell className="py-2 text-gray-700">
            <a href={`tel:${item.phone}`} className="underline hover:text-green-600 transition-colors">{item.phone}</a>
            </TableCell>
            <TableCell className="py-2 text-gray-700">{item.city}</TableCell>
            <TableCell className="py-2 text-gray-700">{item.address}</TableCell>
            <TableCell className="py-2">
            <Badge className="px-2 py-1 text-xs" variant={stateVariants[item.status]}>
                {item.status}
            </Badge>
            </TableCell>
            <TableCell className="py-2">{handleActions}</TableCell>
        </TableRow>
    )
}