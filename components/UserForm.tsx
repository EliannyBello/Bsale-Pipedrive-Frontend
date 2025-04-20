'use client'
import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { UserRole, UsersResponse} from "@/app/api/users/user.interface"

interface UserFormProps {
    user?: UsersResponse;
    onSubmitAction: (user: UsersResponse) => void;
}

export default function UserForm({ user, onSubmitAction }: UserFormProps) {
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>(user?.role || UserRole.User)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
    }, [user])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userData: UsersResponse = {
            _id: user?._id,
            name,
            email,
            role,
            password,
            status: user?.status ?? true, 
            lastLogin: user?.lastLogin ?? '' 
        }
        if (password.length === 0) userData.password = undefined
        onSubmitAction(userData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="password">
                    {user ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!user}
                />
            </div>
            <div>
                <Label htmlFor="role">Rol</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)} required>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Seleccionar rol"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={UserRole.Admin}>Administrador</SelectItem>
                        <SelectItem value={UserRole.User}>Usuario</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit">{user ? 'Actualizar' : 'Crear'} Usuario</Button>
        </form>
    )
}

