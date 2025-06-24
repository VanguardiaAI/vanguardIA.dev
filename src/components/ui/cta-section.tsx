"use client"

import { useState } from "react";
import Orb from "./orb";
import { RainbowButton } from "./rainbow-button";
import { ContactModal } from "./contact-modal";

export function CTASection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section className="w-full bg-black py-20 relative overflow-hidden" id="contacto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Orb Background */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Orb
              hue={280}
              hoverIntensity={0.5}
              rotateOnHover={true}
              forceHoverState={false}
            />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 text-center pointer-events-none">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                <span className="block">¿Listo para</span>
                <span className="block text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text font-medium">
                  Automatizar
                </span>
                <span className="block">tu Negocio?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
                Implementa chatbots inteligentes y aplicaciones con IA que transformen tu operación
              </p>
              
              <div className="flex justify-center items-center">
                <RainbowButton 
                  onClick={() => setIsContactModalOpen(true)}
                  className="pointer-events-auto text-lg px-10 py-4 h-auto"
                >
                  Hablemos de tu Proyecto
                </RainbowButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Hablemos de tu Proyecto"
        subtitle="Cuéntanos tu idea y te ayudaremos a hacerla realidad con IA"
      />
    </section>
  );
} 