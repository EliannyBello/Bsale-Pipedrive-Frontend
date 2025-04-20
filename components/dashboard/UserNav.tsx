'use client'

import React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { UserConfig } from "@/components/dashboard/types"
import { signOut } from 'next-auth/react'


interface UserNavProps {
    user: UserConfig;
}

export function UserNav({ user }: UserNavProps) {

    return (
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-primary-foreground">
                <span>{user.name}</span>
                <span>|</span>
                <span>{user.company}</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuGroup>
                        <Link
                         href={"/dashboard/settings"}>
                        <DropdownMenuItem>
                            Configuración de usuario
                        </DropdownMenuItem>
                        </Link>
                        <Link
                            href={"/dashboard/users"}
                        >
                            <DropdownMenuItem>
                                Usuarios
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={ ()=> signOut()}>
                            Cerrar sesión
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

