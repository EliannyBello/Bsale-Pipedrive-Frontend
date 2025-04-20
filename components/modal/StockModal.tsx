"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IProductResponse, StockHistoryEntry } from "@/app/api/products/product.interface"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
    data: IProductResponse
    open: boolean
    onOpenChangeAction: (open: boolean) => void
}

const DetailTable = ({ data }: { data: IProductResponse }) => (
    <div className="space-y-2">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Fecha</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Orden ID</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Stock Anterior</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Stock Nuevo</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Cantidad Descontada</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.stockHistory && data.stockHistory.length > 0 ? (
                    data.stockHistory.map((entry: StockHistoryEntry, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="border-r border-gray-200 text-center px-4">
                                {entry.date ? new Date(entry.date).toLocaleDateString() : "N/A"}
                            </TableCell>
                            <TableCell className="border-r border-gray-200 text-center px-4">
                                {entry.orderId || "N/A"}
                            </TableCell>
                            <TableCell className="border-r border-gray-200 text-center px-4">
                                {entry.previousStock ?? "0"}
                            </TableCell>
                            <TableCell className="border-r border-gray-200 text-center px-4">
                                {entry.newStock ?? "0"}
                            </TableCell>
                            <TableCell className=" text-center px-4">
                                {entry.quantityDiscounted ?? "0"}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                            Sin historial de stock
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
)

const StockModal = ({ data, open, onOpenChangeAction }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChangeAction}>
            <DialogContent className="sm:max-w-[900px] sm:max-h-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold ">
                        Historial de Stock de {data.name}
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6 mt-4">
                        {data && <DetailTable data={data} />}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default StockModal