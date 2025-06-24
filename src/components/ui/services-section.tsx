'use client'

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ServiceModal } from "./service-modal"
import { ContactModal } from "./contact-modal"

const SERVICES = [
  {
    id: "chatbots",
    title: "Chatbots Inteligentes",
    description: "Desarrollamos chatbots conversacionales con IA que entienden el contexto y proporcionan respuestas precisas, mejorando la experiencia del cliente 24/7.",
    features: ["Chatbots para WooCommerce", "Chatbots para Shopify", "Chatbots para Redes Sociales", "Chatbots para Clínicas y Negocios"],
    icon: ""
  },
  {
    id: "ai-wrappers",
    title: "AI Wrappers Rentables",
    description: "Convertimos modelos de IA generativa en aplicaciones SaaS completas y rentables. Transformamos GPT, DALL-E, Midjourney en herramientas especializadas con sistemas de pago integrados.",
    features: ["SaaS con Sistemas de Pago", "Interfaces Profesionales", "Gestión de Usuarios", "Monetización Automática"],
    icon: ""
  },
  {
    id: "web-apps",
    title: "Aplicaciones Web",
    description: "Desarrollamos aplicaciones web modernas y responsivas que integran IA para ofrecer experiencias únicas y funcionalidades avanzadas.",
    features: ["React & Next.js", "Diseño Responsivo", "Integración con IA", "Performance Optimizada"],
    icon: ""
  },
  {
    id: "mobile-apps",
    title: "Apps Móviles",
    description: "Creamos aplicaciones móviles nativas e híbridas con capacidades de IA que funcionan perfectamente en iOS y Android.",
    features: ["React Native", "Flutter", "IA Integrada", "UX/UI Nativo"],
    icon: ""
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function ServicesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section ref={sectionRef} className="bg-black py-8 md:py-12 relative overflow-hidden" id="servicios">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h5 className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
            Nuestros Servicios
          </h5>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Especialistas en{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text font-normal">
              Integraciones con IA
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Transformamos la complejidad de la IA en soluciones simples y efectivas para tu negocio
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id} 
              variants={cardVariants}
              className="group relative"
            >
              <div className="h-full p-8 bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-neutral-800 rounded-2xl backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 hover:transform hover:-translate-y-2">

                {/* Service Title */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-neutral-400 text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-neutral-300">
                      <svg className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full py-3 px-6 bg-transparent border border-purple-500/40 text-neutral-300 rounded-lg hover:border-purple-400/60 hover:text-purple-300 transition-all duration-300 text-sm font-medium group-hover:scale-105"
                >
                  Saber Más
                </button>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-neutral-400 mb-6">
            ¿No encuentras lo que buscas? Hablemos sobre tu proyecto específico
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
          >
            Consulta Personalizada
          </button>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          onOpenContact={() => setIsContactModalOpen(true)}
          service={selectedService}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Consulta Personalizada"
        subtitle="Cuéntanos sobre tu proyecto específico y te ayudaremos a encontrar la mejor solución"
      />
    </section>
  )
} 