'use client'

import { Suspense, lazy, memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Lazy load Spline con preload
const Spline = lazy(() => 
  import('@splinetool/react-spline').then(module => {
    // Preload para mejorar rendimiento
    return { default: module.default }
  })
)

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
  onError?: () => void
}

// Componente de fallback optimizado
const SplineFallback = memo(() => (
  <div className="w-full h-full flex items-center justify-center bg-transparent">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-4"
    >
      <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <span className="text-gray-400 text-sm">Cargando experiencia 3D...</span>
    </motion.div>
  </div>
))

SplineFallback.displayName = 'SplineFallback'

export const SplineScene = memo(function SplineScene({ 
  scene, 
  className, 
  onLoad, 
  onError 
}: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Preload del script de Spline
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = scene
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [scene])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = (error: Error | unknown) => {
    console.warn('Spline loading error:', error)
    setHasError(true)
    onError?.()
  }

  // Fallback si hay error
  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 opacity-50" />
          <p className="text-gray-500 text-sm">Modo de compatibilidad activado</p>
        </motion.div>
      </div>
    )
  }

  return (
    <Suspense fallback={<SplineFallback />}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.7 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        <Spline 
          scene={scene} 
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            // Optimizaciones de rendering
            willChange: 'transform',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        />
      </motion.div>
    </Suspense>
  )
}) 