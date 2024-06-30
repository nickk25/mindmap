import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@radix-ui/themes/styles.css"
import "./globals.css"

import { Providers } from "@/lib/providers/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mindmap",
  description: "Mindmap App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
