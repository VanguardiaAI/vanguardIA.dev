'use client'

import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Code, Database, Zap, Shield } from "lucide-react"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenContact?: () => void
  service: {
    id: string
    title: string
    description: string
    icon: string
  }
}

const SERVICE_DETAILS = {
  chatbots: {
    subtitle: "Asistentes Virtuales para Cualquier Negocio",
    longDescription: "Desarrollamos chatbots conversacionales personalizados que se adaptan a las necesidades específicas de tu negocio. Desde tiendas online hasta clínicas médicas, nuestros asistentes virtuales mejoran la atención al cliente y automatizan procesos clave.",
    capabilities: [
      {
        icon: <Database className="w-5 h-5" />,
        title: "E-commerce Integrado",
        description: "Chatbots especializados para WooCommerce y Shopify que gestionan consultas de productos, pedidos, inventario y soporte al cliente de forma automatizada."
      },
      {
        icon: <Code className="w-5 h-5" />,
        title: "Redes Sociales",
        description: "Asistentes virtuales para Facebook Messenger, WhatsApp, Instagram y otras plataformas sociales que mantienen conversaciones naturales con tus clientes."
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Negocios Especializados",
        description: "Chatbots personalizados para clínicas médicas, restaurantes, inmobiliarias, servicios profesionales y cualquier tipo de negocio que necesite automatización."
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Soporte Multicanal",
        description: "Integración completa con múltiples canales de comunicación para ofrecer una experiencia consistente en todos los puntos de contacto."
      }
    ],
    features: [
      "Chatbots para tiendas WooCommerce y Shopify",
      "Asistentes para redes sociales (WhatsApp, Facebook, Instagram)",
      "Bots especializados para clínicas y consultas médicas",
      "Automatización para restaurantes y reservas",
      "Soporte al cliente 24/7 automatizado",
      "Integración con sistemas existentes",
      "Conversaciones en múltiples idiomas",
      "Dashboard de gestión y métricas"
    ],
    technologies: ["Inteligencia Artificial Avanzada", "APIs de Integración", "Procesamiento de Lenguaje Natural", "Plataformas Multi-canal", "Análisis de Datos", "Sistemas de Gestión"]
  },
  "ai-wrappers": {
    subtitle: "Convertimos modelos de IA en aplicaciones SaaS generadoras de ingresos",
    longDescription: "Transformamos la potencia de modelos generativos en aplicaciones completas y rentables. Nuestros AI Wrappers toman modelos como GPT, DALL-E, Midjourney y Stable Diffusion y los envuelven en interfaces profesionales con sistemas de pago, gestión de usuarios y toda la infraestructura necesaria para crear un SaaS exitoso.",
    capabilities: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Lanza tu propio SaaS de IA",
        description: "Crea herramientas especializadas para tu nicho de mercado usando los modelos más avanzados del mundo, sin necesidad de entrenar IA desde cero."
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: "Genera nuevas fuentes de ingresos",
        description: "Monetiza la IA generativa con sistemas de suscripción, créditos y pagos únicos integrados desde el primer día."
      },
      {
        icon: <Code className="w-5 h-5" />,
        title: "Automatiza procesos creativos",
        description: "Reduce tiempo y costos en producción de contenido visual, texto, audio y video para tu empresa o clientes."
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Soluciones white-label",
        description: "Ofrece herramientas de IA branded bajo tu marca para diferenciarte en el mercado."
      }
    ],
    features: [
      "Interfaz profesional y responsive",
      "Sistema de usuarios y autenticación",
      "Integración con pasarelas de pago",
      "Dashboard administrativo",
      "APIs para integraciones",
      "Gestión de créditos y límites",
      "Analytics y métricas de uso",
      "Optimización de costos de API",
      "Escalabilidad automática"
    ],
    technologies: [
      "Generación de Imágenes: DALL-E 3, Midjourney, Stable Diffusion, Flux",
      "Procesamiento de Texto: GPT-4, Claude, Gemini",
      "Generación de Video: Runway ML, Pika Labs",
      "Síntesis de Voz: ElevenLabs, OpenAI TTS"
    ],
    caseStudy: {
      title: "¿Por qué elegir nuestros AI Wrappers?",
      description: "De idea a SaaS funcionando en 4-6 semanas. Cada funcionalidad está diseñada para generar ingresos y maximizar tu ROI mientras reducimos los costos de API.",
      results: ["4-6 semanas de desarrollo", "ROI maximizado", "Costos de API optimizados", "Ingresos desde el día 1"]
    }
  },
  "web-apps": {
    subtitle: "Aplicaciones Web Modernas con IA",
    longDescription: "Desarrollamos aplicaciones web de última generación que integran capacidades de IA de forma nativa. Nuestras soluciones combinan interfaces modernas con funcionalidades inteligentes para crear experiencias únicas.",
    capabilities: [
      {
        icon: <Code className="w-5 h-5" />,
        title: "Desarrollo Full-Stack",
        description: "Aplicaciones completas con React/Next.js en frontend, APIs robustas en backend y bases de datos optimizadas."
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "IA Integrada",
        description: "Funcionalidades de IA embebidas nativamente: chatbots, recomendaciones, análisis predictivo y automatización."
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: "Performance Optimizada",
        description: "Aplicaciones rápidas con SSR, caching inteligente, lazy loading y optimización de imágenes automática."
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Escalabilidad Empresarial",
        description: "Arquitectura preparada para crecer: microservicios, CDN, auto-scaling y monitoreo avanzado."
      }
    ],
    features: [
      "Diseño responsive y mobile-first",
      "PWA con funcionalidades offline",
      "Autenticación y autorización avanzada",
      "Dashboard de analytics integrado",
      "Sistema de notificaciones en tiempo real",
      "Integración con APIs de terceros",
      "SEO optimizado automáticamente",
      "Testing automatizado y CI/CD"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel", "AWS"],
    caseStudy: {
      title: "Caso de Éxito: Plataforma SaaS de Gestión Inteligente",
      description: "Desarrollamos una plataforma web que utiliza IA para optimizar procesos empresariales, con dashboard intuitivo y automatización inteligente.",
      results: ["50% aumento en productividad", "Interface premiada", "99.9% uptime", "Escalable a 10k+ usuarios"]
    }
  },
  "mobile-apps": {
    subtitle: "Apps Móviles Inteligentes Multiplataforma",
    longDescription: "Creamos aplicaciones móviles nativas e híbridas que aprovechan las capacidades únicas de dispositivos móviles combinadas con el poder de la IA para ofrecer experiencias excepcionales.",
    capabilities: [
      {
        icon: <Code className="w-5 h-5" />,
        title: "Desarrollo Multiplataforma",
        description: "Apps que funcionan perfectamente en iOS y Android usando React Native o Flutter, con código compartido y performance nativa."
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "IA Móvil Optimizada",
        description: "Implementación de modelos de IA optimizados para móviles, procesamiento local y sincronización inteligente con la nube."
      },
      {
        icon: <Database className="w-5 h-5" />,
        title: "Funcionalidades Nativas",
        description: "Aprovechamos cámara, GPS, sensores, notificaciones push y almacenamiento local para experiencias enriquecidas."
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Seguridad Móvil",
        description: "Encriptación de datos, autenticación biométrica, almacenamiento seguro y protección contra vulnerabilidades móviles."
      }
    ],
    features: [
      "Diseño UX/UI nativo para cada plataforma",
      "Funcionalidad offline con sincronización",
      "Notificaciones push inteligentes",
      "Integración con servicios de mapas",
      "Cámara y procesamiento de imágenes con IA",
      "Pagos in-app seguros",
      "Analytics de uso detallados",
      "Updates over-the-air (OTA)"
    ],
    technologies: ["React Native", "Flutter", "Firebase", "SQLite", "TensorFlow Lite", "Core ML", "App Store Connect", "Google Play Console"],
    caseStudy: {
      title: "Caso de Éxito: App de Reconocimiento Visual con IA",
      description: "Desarrollamos una app móvil que utiliza IA para identificar objetos a través de la cámara, con procesamiento local y experiencia offline.",
      results: ["1M+ descargas", "4.8★ rating promedio", "Procesamiento en <2 segundos", "Funciona 100% offline"]
    }
  }
}

export function ServiceModal({ isOpen, onClose, onOpenContact, service }: ServiceModalProps) {
  const details = SERVICE_DETAILS[service.id as keyof typeof SERVICE_DETAILS]

  if (!details) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-neutral-700">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div>
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                <p className="text-purple-300 font-medium">{details.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Description */}
              <div className="mb-8">
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {details.longDescription}
                </p>
              </div>

              {/* Capabilities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Zap className="w-5 h-5 text-purple-400 mr-2" />
                  Capacidades Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.capabilities.map((capability, index) => (
                    <div key={index} className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-purple-400">
                          {capability.icon}
                        </div>
                        <h4 className="font-semibold text-white">{capability.title}</h4>
                      </div>
                      <p className="text-neutral-400 text-sm">{capability.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  Características Incluidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-neutral-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Code className="w-5 h-5 text-blue-400 mr-2" />
                  Tecnologías Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>



              {/* CTA */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    onClose()
                    onOpenContact?.()
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
                >
                  Solicitar Cotización Personalizada
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 