'use client'

import { useState, useEffect } from 'react'

interface PerformanceConfig {
  reduceMotion: boolean
  disableComplexAnimations: boolean
  optimizeImages: boolean
  reducedParticles: boolean
  simplifiedEffects: boolean
}

// Función para detectar si el usuario prefiere movimiento reducido
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Función para detectar si el dispositivo es de baja potencia
function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  // Detectar dispositivos móviles
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Detectar conexión lenta
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g')
  
  // Detectar memoria limitada (menos de 4GB)
  const deviceMemory = (navigator as any).deviceMemory
  const isLowMemory = deviceMemory && deviceMemory < 4
  
  // Detectar CPU lenta
  const hardwareConcurrency = navigator.hardwareConcurrency
  const isLowCPU = hardwareConcurrency && hardwareConcurrency <= 2
  
  return isMobile || isSlowConnection || isLowMemory || isLowCPU
}

export function usePerformance() {
  const [config, setConfig] = useState<PerformanceConfig>({
    reduceMotion: false,
    disableComplexAnimations: false,
    optimizeImages: false,
    reducedParticles: false,
    simplifiedEffects: false
  })

  useEffect(() => {
    const isLowEnd = isLowEndDevice()
    const reducedMotion = prefersReducedMotion()
    
    setConfig({
      reduceMotion: reducedMotion,
      disableComplexAnimations: isLowEnd || reducedMotion,
      optimizeImages: isLowEnd,
      reducedParticles: isLowEnd,
      simplifiedEffects: isLowEnd || reducedMotion
    })
  }, [])

  // Configuraciones de animación optimizadas
  const getAnimationConfig = (type: 'fast' | 'normal' | 'slow' = 'normal') => {
    const baseConfig = {
      fast: { duration: 0.2, ease: "easeOut" },
      normal: { duration: 0.5, ease: "easeInOut" },
      slow: { duration: 0.8, ease: "easeInOut" }
    }

    if (config.disableComplexAnimations) {
      return { duration: 0.2, ease: "easeOut" }
    }

    return baseConfig[type]
  }

  // Configuración para partículas
  const getParticleConfig = () => {
    if (config.reducedParticles) {
      return {
        count: 8,
        duration: 2,
        complexity: 'low'
      }
    }

    return {
      count: 20,
      duration: 4,
      complexity: 'high'
    }
  }

  return {
    ...config,
    isLowEnd: isLowEndDevice(),
    getAnimationConfig,
    getParticleConfig
  }
} 