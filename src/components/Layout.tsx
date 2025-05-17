import React from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      <main className="flex-grow container px-6 sm:px-0">{children}</main>
    </div>
  )
}