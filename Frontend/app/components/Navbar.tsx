"use client"

import Link from "next/link"
import { Home, Phone, Info } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Phone className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">PhonePricer</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "border-purple-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Home className="mr-1 h-4 w-4" />
                Accueil
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === "/about" ? "border-purple-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Info className="mr-1 h-4 w-4" />À propos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

