'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InfoIcon } from 'lucide-react'
import { Label } from "@/components/ui/label"

interface MoreInformationProps {
  details: Record<string, All['value']>
}
interface All {
    value: string | number | null
}

export default function ProductsInformation({ details }: MoreInformationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatKey = (key: string) => {
    return key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatValue = (value: All['value']) => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'boolean') return value ? 'Sí' : 'No'
    if (typeof value === 'number') return value.toLocaleString()
    return String(value)
  }

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <InfoIcon className="h-4 w-4" />
            <span className="sr-only">Más información</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Información Adicional</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {Object.entries(details).map(([key, value]) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={key} className="text-right font-medium">
                    {formatKey(key)}:
                  </Label>
                  <span id={key} className="col-span-3">
                {formatValue(value)}
              </span>
                </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
  )
}