"use client"

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    confirmButton: {
        label: string
        onClick: () => void
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    }
    cancelButton?: {
        label: string
        onClick?: () => void
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    }
}

export function ConfirmationDialog({
                                       open,
                                       onOpenChange,
                                       title,
                                       description,
                                       confirmButton,
                                       cancelButton = {
                                           label: "Cancelar",
                                           variant: "secondary",
                                       },
                                   }: ConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cerrar</span>
                </button>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button
                        variant={cancelButton.variant}
                        onClick={cancelButton.onClick ?? (() => onOpenChange(false))}
                    >
                        {cancelButton.label}
                    </Button>
                    <Button
                        variant={confirmButton.variant ?? "destructive"}
                        onClick={confirmButton.onClick}
                    >
                        {confirmButton.label}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

