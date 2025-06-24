'use client'

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CpuArchitecture } from './cpu-architecture'

interface LoaderProps {
  isVisible: boolean
  onComplete: () => void
}

interface Particle {
  id: number
  color: string
  initialX: number
  initialY: number
  targetX: number
  delay: number
  duration: number
  glowSize: number
}

// Componente de partícula optimizado
const OptimizedParticle = memo(({ particle }: { particle: Particle }) => (
  <motion.div
    key={particle.id}
    initial={{ 
      opacity: 0,
      x: particle.initialX,
      y: particle.initialY
    }}
    animate={{ 
      opacity: [0, 1, 0],
      y: -50,
      x: particle.targetX
    }}
    transition={{
      delay: particle.delay,
      duration: particle.duration,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute w-1 h-1 rounded-full gpu-accelerated"
    style={{
      backgroundColor: particle.color,
      boxShadow: `0 0 ${particle.glowSize}px ${particle.color}`
    }}
  />
));

OptimizedParticle.displayName = 'OptimizedParticle';

export const Loader = memo(function Loader({ isVisible, onComplete }: LoaderProps) {
  const [showLoader, setShowLoader] = useState(isVisible)
  const [particles, setParticles] = useState<Particle[]>([])

  // Configurar partículas solo en el cliente - menos partículas para más velocidad
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#A855F7']
      const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({ // Reducido a 6 partículas
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        initialX: Math.random() * window.innerWidth,
        initialY: window.innerHeight + 50,
        targetX: Math.random() * window.innerWidth,
        delay: Math.random() * 0.5, // Más rápido
        duration: 1.5 + Math.random() * 0.5, // Más rápido
        glowSize: 2 + Math.random() * 2
      }))
      setParticles(newParticles)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Prevenir scroll mientras el loader está visible
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.right = '0'
      setShowLoader(true)
    } else {
      // Transición inmediata sin delay
      // Restaurar scroll y asegurar que estemos en la parte superior
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      
      // Forzar scroll al top
      window.scrollTo(0, 0)
      
      setShowLoader(false)
      onComplete()
    }
  }, [isVisible, onComplete])

  if (!showLoader) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.15, // Ultra rápido
            ease: "easeInOut"
          }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center gpu-accelerated"
        >
          {/* Fondo completamente negro sin gradientes */}
          <div className="absolute inset-0 bg-black" />
          
          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            
            {/* CPU Architecture Animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.01, // Ultra reducido
                duration: 0.3, // Más rápido
                ease: "easeOut"
              }}
              className="w-64 h-32 md:w-80 md:h-40 gpu-accelerated"
            >
              <CpuArchitecture 
                text="CPU"
                className="text-white w-full h-full optimize-text"
                animateText={true}
                animateLines={true}
                animateMarkers={true}
              />
            </motion.div>

            {/* Loading text with shimmer effect */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.05, // Ultra reducido
                duration: 0.25, // Más rápido
                ease: "easeOut"
              }}
              className="text-center"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white loader-text optimize-text">
                Unwrapping Intelligence...
              </h1>
            </motion.div>

            {/* Progress indicator - Más rápido */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                delay: 0.1, // Ultra reducido
                duration: 0.6, // Más rápido
                ease: "easeInOut"
              }}
              className="w-48 md:w-64 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full overflow-hidden gpu-accelerated"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  delay: 0.2,
                  duration: 0.4, // Más rápido
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 gpu-accelerated"
              />
            </motion.div>

            {/* Floating particles effect - Menos partículas y más rápidas */}
            {particles.length > 0 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                  <OptimizedParticle key={particle.id} particle={particle} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}); 