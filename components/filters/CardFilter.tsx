import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { EnumLang, EnumState } from "@/app/api/common/interface/queryParams.interface";

interface FiltersProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleStateChange: (state: string) => void;
    handleClearFilters: () => void;
    handleApplyFilters: () => void;
    handleLangChage: (lang: string) => void;
}


export function CardFilter({ open, onOpenChange, handleStateChange, handleClearFilters, handleApplyFilters, handleLangChage }: FiltersProps) {

    // Define los nombres de los estados en español e inglés
    const langDisplayNames: Record<EnumLang, string> = {
        [EnumLang.ES]: "Español",
        [EnumLang.EN]: "Inglés",
    };

    // define nombres para los estados 
    const stateDisplayNames: Record<EnumState, string> = {
        [EnumState.PENDING]: "Pendiente",
        [EnumState.COMPLETED]: "Completado",
        [EnumState.FAILED]: "Fallido",
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
                            {Object.values(EnumState).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {stateDisplayNames[status]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Filtro por Idioma */}
                <div>
                    <p className="text-sm text-gray-700">Filtrar por Idioma</p>
                    <Separator className="my-1" />
                    <Select onValueChange={handleLangChage}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione un Idioma" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(EnumLang).map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {langDisplayNames[lang]}
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