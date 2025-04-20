'use client'
import './globals.css'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import React from "react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="es">
          <head>
              <title>Dashboard</title>
              <meta name="description" content="Panel de Administracion"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              {/* <link rel="icon" href="/-logo.jpg" type="image/jpg"/> */}
          </head>
          <body className={inter.className}>
            <SessionProvider>
              <Toaster richColors position="bottom-center"/>
              {children}
            </SessionProvider>
          </body>
      </html>
  )
}