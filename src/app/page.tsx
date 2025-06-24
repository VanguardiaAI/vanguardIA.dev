'use client'

import { SplineSceneBasic } from "@/components/ui/demo";
import { Navbar } from "@/components/ui/navbar";
import { ServicesSection } from "@/components/ui/services-section";
import { CTASection } from "@/components/ui/cta-section";
import { ContactModal } from "@/components/ui/contact-modal";
import { Loader } from "@/components/ui/loader";
import { useSplineLoader } from "@/hooks/useSplineLoader";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const { isLoading } = useSplineLoader();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleLoaderComplete = () => {
    console.log('Loader completed');
  };



  return (
    <>
      {/* Loader */}
      <Loader 
        isVisible={isLoading} 
        onComplete={handleLoaderComplete}
      />

      {/* Main Content */}
      <motion.div 
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Section */}
        <section className="w-full" id="inicio">
          <SplineSceneBasic />
        </section>

        {/* Services Section */}
        <section className="w-full">
          <ServicesSection />
        </section>

        {/* CTA Section with Orb */}
        <CTASection />

        {/* Footer */}
        <footer className="bg-black border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.svg"
                      alt="VanguardIA Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white text-xl font-semibold">VanguardIA.dev</span>
                </div>
                <p className="text-neutral-400 text-base leading-relaxed mb-6 max-w-md">
                  Especialistas en chatbots inteligentes y aplicaciones con IA integrada. Transformamos la complejidad de la IA en soluciones simples y efectivas para tu negocio.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Servicios</h3>
                <ul className="space-y-3">
                  <li><a href="#servicios" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">Chatbots IA</a></li>
                  <li><a href="#servicios" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">AI Wrappers</a></li>
                  <li><a href="#servicios" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">Aplicaciones Web</a></li>
                  <li><a href="#servicios" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">Apps Móviles</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Empresa</h3>
                <ul className="space-y-3">
                  <li><a href="#nosotros" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">Sobre Nosotros</a></li>
                  <li><a href="#servicios" className="text-neutral-400 hover:text-purple-400 transition-colors duration-300">Servicios</a></li>
                  <li>
                    <button 
                      onClick={() => setIsContactModalOpen(true)}
                      className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      Contacto
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
              <p className="text-neutral-500 text-sm">
                © 2024 VanguardIA.dev. Todos los derechos reservados.
              </p>
            </div>
          </div>

          {/* Background Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </footer>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </motion.div>
    </>
  );
}
