"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ICardResponse } from "@/app/api/cards/card.interface"



interface Props {
    data: ICardResponse[] // Change to an array of ICardResponse
    open: boolean
    onOpenChange: (open: boolean) => void
}



const DetailTable = ({ data }: { title: string; data: ICardResponse[] }) => (
    <div className="space-y-2">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">N. Coleccionista</TableHead>
                    <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Artista</TableHead>
                    <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Costo de Maná</TableHead>
                    <TableHead className=" border-gray-200 text-center  text-white bg-[#121538]">Finishes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="border-r border-gray-200 text-center px-4">{item?.collectorNumber}</TableCell>
                        <TableCell className="border-r border-gray-200 text-center px-1">{item?.artist}</TableCell>
                        <TableCell className="border-r border-gray-200 text-center px-1">{item?.manaCost || "Sin Costo"}</TableCell>
                        <TableCell className=" text-center px-1">
                            {item.finishes?.join(", ") || "No Finish"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);



export default function CardModal({ data, open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] sm:max-h-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Detalle de Carta</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6 mt-4">
                        {data && <DetailTable title="Detalles de Recepción" data={data} />}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}