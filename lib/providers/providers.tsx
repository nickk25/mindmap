"use client"

import { RadixProvider } from "@/lib/providers/radix-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"

import { DataProvider } from "../contexts/useData"
import { CustomizedClerkProvider } from "./clerk-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RadixProvider>
        <CustomizedClerkProvider>
          <DataProvider>{children}</DataProvider>
        </CustomizedClerkProvider>
      </RadixProvider>
    </ThemeProvider>
  )
}
