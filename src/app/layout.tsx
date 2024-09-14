import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { TaskProvider } from "./context/TaskContext"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "پروژه مدیرت کار",
  description: "پروژه مدیریت کار نسیبا",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TaskProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable}  container`}
        >
          {children}
        </body>
      </html>
    </TaskProvider>
  )
}
