'use client'

import { motion, AnimatePresence } from "framer-motion"
import { X, Send, User, Mail, Phone, MessageSquare, Building } from "lucide-react"
import { useState } from "react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
}

export function ContactModal({ isOpen, onClose, title, subtitle }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Resetear después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      onClose()
    }, 3000)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      onClose()
    }
  }

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
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-neutral-700">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {title || "¿Listo para Transformar tu Negocio?"}
                </h2>
                <p className="text-purple-300 font-medium mt-1">
                  {subtitle || "Cuéntanos sobre tu proyecto y te ayudaremos a crear la solución perfecta"}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre y Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teléfono y Empresa */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Empresa
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Servicio de Interés */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Servicio de Interés
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="chatbots">Chatbots Inteligentes</option>
                      <option value="ai-wrappers">AI Wrappers Personalizados</option>
                      <option value="web-apps">Aplicaciones Web</option>
                      <option value="mobile-apps">Apps Móviles</option>
                      <option value="consultoria">Consultoría General</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Cuéntanos sobre tu proyecto *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                        placeholder="Describe tu proyecto, necesidades específicas, presupuesto aproximado, timeline, etc."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Message */
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-neutral-300 mb-6">
                    Gracias por contactarnos. Nos pondremos en contacto contigo dentro de las próximas 24 horas para discutir tu proyecto.
                  </p>
                  <div className="text-sm text-neutral-400">
                    Esta ventana se cerrará automáticamente...
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 