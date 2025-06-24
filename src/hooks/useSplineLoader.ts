'use client'

import { useState, useEffect, useCallback } from 'react'

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

export function useSplineLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSplineReady, setIsSplineReady] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  // Detectar dispositivo de baja potencia
  useEffect(() => {
    setIsLowEnd(isLowEndDevice())
  }, [])

  // Función para marcar Spline como cargado
  const onSplineLoad = useCallback(() => {
    setIsSplineReady(true)
    // Transición más rápida en dispositivos lentos
    const delay = isLowEnd ? 0 : 300
    setTimeout(() => {
      setIsLoading(false)
    }, delay)
  }, [isLowEnd])

  // Función para manejar errores de carga
  const onSplineError = useCallback(() => {
    console.warn('Error loading Spline scene, hiding loader anyway')
    setIsLoading(false)
  }, [])

  // Timeout de seguridad más agresivo para dispositivos lentos
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline loading timeout, hiding loader')
        setIsLoading(false)
      }
    }, isLowEnd ? 1500 : 3000) // Timeout más corto para dispositivos lentos

    return () => clearTimeout(timeout)
  }, [isLoading, isLowEnd])

  // Asegurar que la página esté en la parte superior cuando se monte el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  return {
    isLoading,
    isSplineReady,
    isLowEnd,
    onSplineLoad,
    onSplineError
  }
} 