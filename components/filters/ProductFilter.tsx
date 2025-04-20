import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { EnumStatusJumpseller } from "@/app/api/common/interface/queryParams.interface";

interface FiltersProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleStateChange: (state: string) => void;
    handleClearFilters: () => void;
    handleApplyFilters: () => void;
}


export function ProductFilter({ open, onOpenChange, handleStateChange, handleClearFilters, handleApplyFilters}: FiltersProps) {


    // define nombres para los estados 
    const stateDisplayNames: Record<EnumStatusJumpseller, string> = {
        [EnumStatusJumpseller.AVAILABLE]: "Disponible",
        [EnumStatusJumpseller.DISABLED]: "Deshabilitado",
        [EnumStatusJumpseller.NOAVAILABLE]: "No disponible",
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-[#121538] my-3">Filtrar Traspasos</DialogTitle>
                </DialogHeader>
                {/* Filtro por Estado */}
                <div>
                    <p className="text-sm text-gray-700">Filtrar por Estado</p>
                    <Separator className="my-1" />
                    <Select onValueChange={handleStateChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(EnumStatusJumpseller).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {stateDisplayNames[status]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
             
                {/* Botón para limpiar filtros */}
                <Separator className="my-3" />
                <div className="flex justify-between">
                    <button className="w-full font-semibold text-[#121538] hover:bg-gray-100 p-2 rounded" onClick={handleApplyFilters}>Aplicar</button>
                    <button className="w-full font-semibold text-red-500 hover:bg-gray-100 p-2 rounded" onClick={handleClearFilters}>
                        Limpiar
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}