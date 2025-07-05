"use client"

import { ICardResponse } from "@/app/api/clients/client.interface"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"



interface Props {
    data: ICardResponse
    open: boolean
    onOpenChangeAction: (open: boolean) => void
}



const ImageModal = ({ data, open, onOpenChangeAction }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChangeAction}>
            <DialogContent className="sm:max-w-[900px] sm:max-h-[600px] bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl bg-black text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white text-center dark:shadow-gray-900">
                        Imagen de Carta
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center h-full">
                    {!data ? (
                        <div className="flex flex-col items-center justify-center h-full text-white">
                            'No hay imagen disponible'
                        </div>
                    ) : (
                        <img
                            src={
                                data.imageUris?.large ||
                                data.cardFaces?.[0]?.imageUris?.large ||
                                data.cardFaces?.[1]?.imageUris?.large
                            }
                            alt="Carta"
                            className="w-full h-auto rounded-lg sm:max-w-[300px] sm:max-h-[500px] shadow-lg shadow-gray-700 dark:shadow-gray-900 transition-transform duration-300 hover:scale-105"
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ImageModal;