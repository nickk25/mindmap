"use client"

import { RadixProvider } from "@/lib/providers/radix-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"

import { ConnectionsProvider } from "../contexts/useConnections"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RadixProvider>
        <ConnectionsProvider>{children}</ConnectionsProvider>
      </RadixProvider>
    </ThemeProvider>
  )
}
