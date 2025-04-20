"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IProductResponse } from "@/app/api/products/product.interface"




interface Props {
    data: IProductResponse
    open: boolean
    onOpenChange: (open: boolean) => void
}



const DetailTable = ({ data }: { title: string; data: IProductResponse }) => (
    <div className="space-y-2">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">SKU</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Finish</TableHead>
                    <TableHead className="border-gray-200 text-center text-white bg-[#121538]">Lenguaje</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.variants.map((variant, index) => (
                    <TableRow key={index}>
                        <TableCell className="border-r border-gray-200 text-center px-4">{variant.sku}</TableCell>
                        <TableCell className="border-r border-gray-200 text-center px-1">
                            {variant.options.find(option => option.name === "Finish")?.value || "N/A"}
                        </TableCell>
                        <TableCell className=" text-center px-1">
                            {variant.options.find(option => option.name === "Lenguaje")?.value || "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);



export default function ProductModal({ data, open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] sm:max-h-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Detalle de Producto</DialogTitle>
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