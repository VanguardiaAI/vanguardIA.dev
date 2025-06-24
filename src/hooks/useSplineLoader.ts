'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function useSplineLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSplineReady, setIsSplineReady] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadStartTime = useRef<number>(Date.now())

  // Función para marcar Spline como cargado
  const onSplineLoad = useCallback(() => {
    const loadTime = Date.now() - loadStartTime.current
    console.log(`Spline loaded in ${loadTime}ms`)
    
    setIsSplineReady(true)
    
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    // Transición más rápida para mejor UX
    setTimeout(() => {
      setIsLoading(false)
    }, 100) // Mínimo delay para suavidad visual
  }, [])

  // Función para manejar errores de carga
  const onSplineError = useCallback(() => {
    console.warn('Error loading Spline scene, hiding loader anyway')
    
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    setIsLoading(false)
  }, [])

  // Timeout de seguridad más inteligente
  useEffect(() => {
    // Timeout inicial más corto para mejor UX
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline loading timeout, hiding loader')
        setIsLoading(false)
      }
    }, 1500) // Reducido a 1.5 segundos

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isLoading])

  // Asegurar que la página esté en la parte superior cuando se monte el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Scroll suave al top
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      // Preload recursos críticos
      const preloadLinks = [
        'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
      ]
      
      preloadLinks.forEach(url => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = url
        link.as = 'fetch'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }
  }, [])

  // Performance monitoring
  useEffect(() => {
    if (!isLoading && isSplineReady) {
      const totalLoadTime = Date.now() - loadStartTime.current
      console.log(`Total loading experience: ${totalLoadTime}ms`)
      
      // Reportar métricas de rendimiento (opcional)
      if (typeof window !== 'undefined' && 'performance' in window) {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          console.log('Page load metrics:', {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            splineLoad: totalLoadTime
          })
        } catch {
          // Silently handle performance API errors
          console.log('Performance API not available or error occurred')
        }
      }
    }
  }, [isLoading, isSplineReady])

  return {
    isLoading,
    isSplineReady,
    onSplineLoad,
    onSplineError
  }
} 