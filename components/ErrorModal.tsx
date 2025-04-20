'use client'
import {AlertCircle} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ModalErrorOrdenesProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    message: string;
    textButton?: string;
    onClickButton?: () => void;
}

export default function ErrorModal({
                                       isOpen,
                                       onClose,
                                       title,
                                       description,
                                       message,
                                       textButton = 'Cerrar',
                                       onClickButton
                                   }: ModalErrorOrdenesProps) {
    const handleClickButton = () => {
        if (onClickButton) onClickButton();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-6 w-6"/>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        {message}
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleClickButton}>{textButton}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}