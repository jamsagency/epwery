import { Barlow } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Import React

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
})

export const metadata: Metadata = {
  title: "Epwery - Digital Transformation Specialists",
  description: "Creating lasting value through expert guidance and execution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} font-sans`}>{children}</body>
    </html>
  )
}

