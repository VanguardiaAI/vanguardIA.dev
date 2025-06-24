'use client'

import { useState } from "react"
import { ContactModal } from "./contact-modal"
import Image from "next/image"

export function Navbar() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="VanguardIA Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-2xl font-bold text-white">
              Vanguard<span className="text-purple-400">IA</span>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              INICIO
            </a>
            <a href="#servicios" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              SERVICIOS
            </a>
            <a href="#nosotros" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              NOSOTROS
            </a>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              CONTACTO
            </button>
          </div>
          
          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="text-white font-mono">VanguardIA.dev</span>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="p-2 text-white hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  )
} 