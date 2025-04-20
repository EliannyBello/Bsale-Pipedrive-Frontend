import React, { useState } from 'react'
import { TableCell, TableRow, } from "@/components/ui/table"
import { ICardResponse } from '@/app/api/cards/card.interface'
import { Badge } from '@/components/ui/badge'
import Image from "next/image";
import espanaFlag from "@/public/espana.png";
import usaFlag from "@/public/estados-unidos.png";
import ImageModal from '@/components/modal/ImageModal';


interface CardTableRowProps {
    item: ICardResponse
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


const stateVariants: Record<string, "warning" | "success" | "secondary" | "destructive" | "outline"> = {
    "pending": "warning",    // Amarillo
    "completed": "success",   // Verde
    "informed": "secondary",  // Azul
    "failed": "destructive",  // Rojo
};



function getFlagSrc(lang: string): string {
    switch (lang) {
        case 'es':
            return espanaFlag.src;
        default:
            return usaFlag.src;
    }
}


export function CardTableRow({ item, handleActions }: CardTableRowProps) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    return (
        <React.Fragment>
            <TableRow className="pl-23">
                <TableCell className="border-r border-gray-100 px-4 text-right">{item.collectorNumber}</TableCell>
                <TableCell className="border-r border-gray-100 px-8 text-center"
                    onClick={() => setIsModalOpen(true)}>
                    {item.imageUris?.small || item.cardFaces?.[0]?.imageUris?.small ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center border border-gray-300 shadow-lg shadow-gray-700 dark:shadow-gray-900 transition-transform duration-300 hover:scale-105">
                            <Image
                                src={item.imageUris?.small || item.cardFaces?.[0]?.imageUris?.small || "/fallback-image.png"}
                                alt={item.name || "Imagen de carta"}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full border-black border-2 rounded-full shadow-xl shadow-black-500/50"
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full flex justify-center items-center border border-gray-300 bg-gray-200">
                            <span>No Image</span>
                        </div>
                    )}
                </TableCell>
                <TableCell className="border-r border-gray-100 px-8 text-left">{item.name} <br></br> {item.printedName}</TableCell>
                <TableCell className="border-r border-gray-100 px-6 text-center">
                    <Image
                        src={getFlagSrc(item.lang)}
                        alt="Bandera"
                        width={40}
                        height={20}
                    />
                </TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-left">{item.typeLine}</TableCell>
                <TableCell className="border-r border-gray-100 px-8 text-left">{item.setName}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-left">{item.rarity}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-right">{item.cmc}</TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-right">
                    {item.prices?.usd ? `$${item.prices.usd}` : "$0"}
                </TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-center">
                    <Badge variant={stateVariants[item.status]}>
                        {item.status}
                    </Badge>
                </TableCell>
                <TableCell className="border-r border-gray-100 px-4 text-right">
                    {formatDateTime(item.createdAt)}</TableCell>
                <TableCell className="justify-items-center px-8">
                    {handleActions}
                </TableCell>
            </TableRow>
            {isModalOpen && (
                <ImageModal
                    data={item}
                    open={isModalOpen}
                    onOpenChangeAction={setIsModalOpen}
                />
            )}
        </React.Fragment>
    )
}