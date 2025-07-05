import React from 'react'
import { TableCell, TableRow } from "@/components/ui/table"
import { IClientResponse } from '@/app/api/clients/client.interface'

interface ClientTableRowProps {
    item: IClientResponse
    handleActions?: React.ReactNode
}

export function ClientTableRow({ item, handleActions }: ClientTableRowProps) {
    return (
        <TableRow>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.city}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.points}</TableCell>
            <TableCell>{item.maxCredit}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
            <TableCell>{handleActions}</TableCell>
        </TableRow>
    )
}