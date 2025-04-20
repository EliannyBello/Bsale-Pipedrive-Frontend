import React from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { UsersResponse } from '@/app/api/users/user.interface';
import { Badge } from '@/components/ui/badge';
interface UserTableRowProps {
    item: UsersResponse
    handleActions: React.ReactNode
    isSelected: boolean
    isExpanded: boolean
    onSelect: () => void
    onExpand: () => void
}

const formatDateTime = (dateString?: string) => {
    if (!dateString) return ""; // Maneja valores null o undefined

    const fecha = new Date(dateString);
    if (isNaN(fecha.getTime())) return "Fecha inválida"; // Verifica si es una fecha válida

    return `${fecha.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
            ${fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
};



const roleVariants: Record<string, "warning" | "success" | "secondary" | "destructive" | "outline"> = {
    "Admin": "success",   // Verde
    "User": "secondary",  // Azul
};



export function UserTableRow({ item, handleActions }: UserTableRowProps) {
    return (
        <React.Fragment>
            <TableRow>
                <TableCell className='text-center' >{item.name}</TableCell>
                <TableCell className='text-center'>{item.email}</TableCell>
                <TableCell className='text-center'>
                    <Badge variant={roleVariants[item.role]}>
                        {item.role}
                    </Badge>
                </TableCell>
                <TableCell className='text-center'>{formatDateTime(item.lastLogin)}</TableCell>
                <TableCell className="justify-items-center">
                    {handleActions}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
