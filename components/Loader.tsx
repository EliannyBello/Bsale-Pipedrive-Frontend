import { Loader2 } from 'lucide-react'
import React from "react";

interface LoaderProps {
    size?: number
    text?: string
}

export function Loader({ size = 24, text = "Cargando..." }: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="animate-spin" size={size} />
            <p className="text-sm text-muted-foreground">{text}</p>
        </div>
    )
}
