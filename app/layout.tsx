import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@radix-ui/themes/styles.css"
import "./globals.css"

import { Providers } from "@/lib/providers/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Second Brain",
  description:
    "A 3D mind mapping application for visualizing and navigating ideas and concepts",
  icons: ["https://vercel.pub/favicon.ico"],
  openGraph: {
    title: "Second Brain",
    description:
      "A 3D mind mapping application for visualizing and navigating ideas and concepts",
    images: ["https://3d-second-brain.vercel.app/thumbnail.png"],
  },
  metadataBase: new URL("https://3d-second-brain.vercel.app"),
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
