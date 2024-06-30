"use client"

import { RadixProvider } from "@/lib/providers/radix-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RadixProvider>{children}</RadixProvider>
    </ThemeProvider>
  )
}
