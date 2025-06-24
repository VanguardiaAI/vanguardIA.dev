// Configuración global de rendimiento
export const PERFORMANCE_CONFIG = {
  // Umbrales para detección de dispositivos lentos
  LOW_MEMORY_THRESHOLD: 4, // GB
  LOW_CPU_CORES: 2,
  SLOW_CONNECTIONS: ['slow-2g', '2g', '3g'],
  
  // Configuraciones de animación
  ANIMATION_DURATIONS: {
    FAST: 0.2,
    NORMAL: 0.5,
    SLOW: 0.8
  },
  
  // Configuraciones de partículas
  PARTICLE_COUNTS: {
    LOW_END: 4,
    NORMAL: 8,
    HIGH_END: 16
  },
  
  // Configuraciones de efectos
  EFFECTS: {
    ENABLE_BLUR: true,
    ENABLE_SHADOWS: true,
    ENABLE_GRADIENTS: true,
    ENABLE_3D: true
  }
}

// Función para detectar capacidades del dispositivo
export function getDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      isMobile: false,
      hasSlowConnection: false,
      hasLowMemory: false,
      hasLowCPU: false,
      prefersReducedMotion: false
    }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  const hasSlowConnection = connection && PERFORMANCE_CONFIG.SLOW_CONNECTIONS.includes(connection.effectiveType)
  
  const deviceMemory = (navigator as any).deviceMemory
  const hasLowMemory = deviceMemory && deviceMemory < PERFORMANCE_CONFIG.LOW_MEMORY_THRESHOLD
  
  const hardwareConcurrency = navigator.hardwareConcurrency
  const hasLowCPU = hardwareConcurrency && hardwareConcurrency <= PERFORMANCE_CONFIG.LOW_CPU_CORES
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const isLowEnd = isMobile || hasSlowConnection || hasLowMemory || hasLowCPU

  return {
    isLowEnd,
    isMobile,
    hasSlowConnection,
    hasLowMemory,
    hasLowCPU,
    prefersReducedMotion
  }
}

// Función para obtener configuración de animación optimizada
export function getOptimizedAnimationConfig(type: 'fast' | 'normal' | 'slow' = 'normal') {
  const { isLowEnd, prefersReducedMotion } = getDeviceCapabilities()
  
  if (isLowEnd || prefersReducedMotion) {
    return {
      duration: PERFORMANCE_CONFIG.ANIMATION_DURATIONS.FAST,
      ease: "easeOut"
    }
  }
  
  return {
    duration: PERFORMANCE_CONFIG.ANIMATION_DURATIONS[type.toUpperCase() as keyof typeof PERFORMANCE_CONFIG.ANIMATION_DURATIONS],
    ease: "easeInOut"
  }
}

// Función para obtener configuración de partículas optimizada
export function getOptimizedParticleConfig() {
  const { isLowEnd } = getDeviceCapabilities()
  
  return {
    count: isLowEnd ? PERFORMANCE_CONFIG.PARTICLE_COUNTS.LOW_END : PERFORMANCE_CONFIG.PARTICLE_COUNTS.NORMAL,
    duration: isLowEnd ? 1.5 : 3,
    delay: isLowEnd ? 0.5 : 1
  }
}

// Función para obtener configuración de efectos optimizada
export function getOptimizedEffectsConfig() {
  const { isLowEnd, prefersReducedMotion } = getDeviceCapabilities()
  
  if (isLowEnd || prefersReducedMotion) {
    return {
      enableBlur: false,
      enableShadows: false,
      enableGradients: true,
      enable3D: false,
      enableComplexAnimations: false
    }
  }
  
  return {
    enableBlur: PERFORMANCE_CONFIG.EFFECTS.ENABLE_BLUR,
    enableShadows: PERFORMANCE_CONFIG.EFFECTS.ENABLE_SHADOWS,
    enableGradients: PERFORMANCE_CONFIG.EFFECTS.ENABLE_GRADIENTS,
    enable3D: PERFORMANCE_CONFIG.EFFECTS.ENABLE_3D,
    enableComplexAnimations: true
  }
} 