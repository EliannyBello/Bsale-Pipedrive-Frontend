'use client'
import React from 'react'
import  { MainNav } from '@/components/dashboard/MainNav'
import { NavSelector } from '@/components/dashboard/NavSelector'
import { UserNav } from '@/components/dashboard/UserNav'
import { DashboardProvider, Option } from "@/app/context/DashboardContext"
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
    children: React.ReactNode
    options: Option[]
}
export default function DashboardLayout({ children, options }: DashboardLayoutProps) {
    const { data } = useSession()
    const pathname = usePathname()
    return (
        <DashboardProvider initialOptions={options}>
            <div className="flex min-h-screen flex-col">
                <div className="border-b shadow-lg bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white">
                    <div className="flex h-20 items-center px-8">
                        <div className="flex items-center space-x-4">
                            {/* NavSelector visible y estilizado */}
                            <div className="hidden md:block">
                                <div className="rounded-lg bg-primary-foreground/10 p-1">
                                    {/* @ts-ignore */}
                                    <NavSelector />
                                </div>
                            </div>
                        </div>
                        <MainNav
                            className="mx-8 text-white font-semibold"
                            currentPath={pathname}
                        />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav user={{
                                name: data?.user.name || "Usuario desconocido",
                                company: "Integración Bsale-Pipedrive",
                                avatar: "https://github.com/shadcn.png"
                            }} />
                        </div>
                    </div>
                </div>
                <main className="flex-1 bg-gradient-to-br from-primary-foreground/5 via-white to-primary/5 p-4">
                    {children}
                </main>
            </div>
        </DashboardProvider>
    )
}

