'use client'
import React from 'react'
import  { MainNav } from '@/components/dashboard/MainNav'
import { UserNav } from '@/components/dashboard/UserNav'
import { DashboardProvider, Option } from "@/app/context/DashboardContext"
import {Logo} from "@/components/Logo";
import { useSession } from 'next-auth/react';

interface DashboardLayoutProps {
    children: React.ReactNode
    options: Option[]
}
export default function DashboardLayout({ children, options }: DashboardLayoutProps) {
    const { data } = useSession()
    return (
        <DashboardProvider initialOptions={options}>
            <div className="flex min-h-screen flex-col">
                <div className="border-b bg-primary text-white">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex items-center space-x-4">
                            <Logo/>
                            {/* <NavSelector /> */}
                        </div>
                        <MainNav
                            className="mx-6 text-white"
                            currentPath="/"
                        />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav user={{
                                name: data?.user.name || "Usuario desconocido",
                                company: "Margic4Ever",
                                avatar: "https://github.com/shadcn.png"
                            }} />
                        </div>
                    </div>
                </div>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </DashboardProvider>
    )
}

