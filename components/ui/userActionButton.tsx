'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2 } from 'lucide-react'

interface UserActionButtonProps {
  action: 'create' | 'edit' | 'delete'
  buttonText: string
  onSubmit: (data: { name: string; email: string; role: string }) => void
  initialData?: { name: string; email: string; role: string }
}

export function UserActionButton({ action, buttonText, onSubmit, initialData }: UserActionButtonProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(initialData?.name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [role, setRole] = useState(initialData?.role || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, role })
    setOpen(false)
  }

  const isDelete = action === 'delete'

  const getIcon = () => {
    switch (action) {
      case 'edit':
        return <Edit className="h-4 w-4" />
      case 'delete':
        return <Trash2 className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
            <Button 
                variant={isDelete ? "destructive" : "outline"} 
                size={action === 'create' ? "default" : "icon"}
              >
                {action === 'create' ? buttonText : getIcon()}
                {action !== 'create' && <span className="sr-only">{buttonText}</span>}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent className="w-80">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{buttonText}</h4>
                <p className="text-sm text-muted-foreground">
                  {isDelete ? "¿Estás seguro de que quieres eliminar este usuario?" : "Ingrese los detalles del usuario."}
                </p>
              </div>
              {!isDelete && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="guest">Invitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <Button type="submit" variant={isDelete ? "destructive" : "default"}>
                {isDelete ? "Confirmar Eliminación" : "Guardar"}
              </Button>
            </form>
          </PopoverContent>
          <TooltipContent className="bg-gray-200 text-xs text-gray-700 rounded p-2">
            <p>{buttonText}</p>
          </TooltipContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  )
}