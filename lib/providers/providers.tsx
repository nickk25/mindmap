"use client"

import { RadixProvider } from "@/lib/providers/radix-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"

import { DataProvider } from "../contexts/useData"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RadixProvider>
        <DataProvider>{children}</DataProvider>
      </RadixProvider>
    </ThemeProvider>
  )
}
