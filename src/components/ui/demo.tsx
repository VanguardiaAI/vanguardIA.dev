'use client'

import { SplineScene } from "@/components/ui/splite";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSplineLoader } from "@/hooks/useSplineLoader";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import SpotlightCard from "@/components/ui/SpotlightCard";

export function SplineSceneBasic() {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const { onSplineLoad, onSplineError } = useSplineLoader();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-black relative overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col pt-20">
          {/* 3D Robot Animation - Arriba en móvil */}
          <div className="w-full h-[60vh] relative flex items-center justify-center">
            <div className="w-full h-full relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                className="w-full h-full scale-150"
                onLoad={onSplineLoad}
                onError={onSplineError}
              />
            </div>
            
            {/* Sin gradiente en móvil para evitar interferencias */}
          </div>
          
          {/* Content - Abajo en móvil */}
          <div className="w-full px-6 py-8 pb-16">
            {/* Main Title */}
            <div className="max-w-2xl mb-8">
              <motion.h1 
                className="text-3xl font-light leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className="mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span 
                    className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-lora"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }}
                  >
                    Agentes de {" "}
                  </span>
                  <motion.span 
                    className="italic text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))"
                    }}
                  >
                    IA
                  </motion.span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span 
                    className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-lora"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }}
                  >
                    que impulsan tu negocio
                  </span>
                </motion.div>
              </motion.h1>
            </div>
            
            {/* Company Description - Compacta en móvil */}
            <div className="max-w-lg">
              <p className="text-gray-400 text-base leading-relaxed mb-6 font-lora italic">
                &ldquo;La IA más poderosa no es la que está en los laboratorios de Silicon Valley. Es la que está trabajando silenciosamente en tu negocio, 24 horas al día.&rdquo;
              </p>
              
              {/* CEO Info */}
              <div>
                <p className="text-white font-medium text-xl font-lora italic">Pablo Luque</p>
                <p className="text-gray-500 text-base italic font-lora">Founder & AI Architect</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row h-screen pt-20">
          {/* Left Side - Content */}
          <div className="w-2/5 flex flex-col justify-between px-8 lg:px-12 xl:px-16 py-12">
            {/* Top Section - Company Description */}
            <div className="max-w-lg pt-8">
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-lora italic">
                &ldquo;La IA más poderosa no es la que está en los laboratorios de Silicon Valley. Es la que está trabajando silenciosamente en tu negocio, 24 horas al día.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-lora italic">
                Mientras otros debaten sobre el futuro de la inteligencia artificial, nosotros la ponemos a trabajar hoy en tu empresa. Creamos chatbots que convierten visitantes en clientes, AI wrappers que transforman ideas simples en fuentes de ingresos pasivos, y aplicaciones inteligentes que automatizan lo que antes te quitaba horas.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-lora italic">
                En VanguardIA, no vendemos tecnología del futuro. Construimos el presente de los negocios inteligentes.&rdquo;
              </p>
              
              {/* CEO Info */}
              <div>
                <p className="text-white font-medium text-2xl font-lora italic">Pablo Luque</p>
                <p className="text-gray-500 text-lg italic font-lora">Founder & AI Architect</p>
              </div>
            </div>
            
            {/* Bottom Section - Main Title */}
            <div className="max-w-2xl">
              <motion.h1 
                className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className="mb-2 whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span 
                    className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-lora"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }}
                  >
                    Agentes de {" "}
                  </span>
                  <motion.span 
                    className="italic text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))"
                    }}
                  >
                    IA
                  </motion.span>
                </motion.div>
                <motion.div 
                  className="whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span 
                    className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-lora"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }}
                  >
                    que impulsan tu negocio
                  </span>
                </motion.div>
              </motion.h1>
            </div>
          </div>
          
          {/* Right Side - 3D Robot Animation */}
          <div className="w-3/5 relative flex items-center justify-start -ml-12 h-full">
            <div className="w-full h-full relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                className="w-full h-full scale-125"
                onLoad={onSplineLoad}
                onError={onSplineError}
              />
              
              {/* Connect Button - Solo visible en desktop */}
              <div className="absolute bottom-12 right-12 z-20">
                <button 
                  onClick={() => {
                    const chatbotSection = document.getElementById('chatbot');
                    if (chatbotSection) {
                      chatbotSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }
                  }}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20 group"
                >
                  <span className="text-sm font-medium">Habla con nuestro Chatbot</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Bottom fade to black gradient - Solo en desktop */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/90 via-black/60 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>

      {/* Connect Button Flotante - Entre secciones solo para móvil */}
      <div className="md:hidden relative -mt-4 mb-4 flex justify-center px-6 z-10">
        <button 
          onClick={() => {
            const chatbotSection = document.getElementById('chatbot');
            if (chatbotSection) {
              chatbotSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              });
            }
          }}
          className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20 group w-full max-w-xs justify-center shadow-2xl"
        >
          <span className="text-sm font-medium">Habla con nuestro Chatbot</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* About Us Section */}
      <section ref={aboutRef} className="bg-black py-8 md:py-12 relative overflow-hidden" id="nosotros">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Statistics Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Years Experience */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(168, 85, 247, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Años de</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Experiencia</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
                  5+
                </div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Desarrollando soluciones de IA de todo tipo
                </p>
              </SpotlightCard>
            </motion.div>

            {/* AI Agents Created */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(168, 85, 247, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Agentes de IA</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Desarrollados</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
                  20+
                </div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Asistentes virtuales inteligentes
                </p>
              </SpotlightCard>
            </motion.div>

            {/* AI Wrappers */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(168, 85, 247, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">AI Wrappers</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Creados</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
                  10+
                </div>
                <p className="text-gray-500 text-xs md:text-sm">
                  SaaS, apps web, apps móviles
                </p>
              </SpotlightCard>
            </motion.div>

            {/* AI Integrations */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(168, 85, 247, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Integraciones IA</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Realizadas</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
                  10+
                </div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Herramientas, automatizaciones, etc.
                </p>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* Main About Content */}
          <motion.div 
            className="mt-8 md:mt-12 text-center"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h5 className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
              Sobre Nosotros
            </h5>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8">
              Transformamos ideas en{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text font-normal">
                inteligencia artificial que funciona
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-6">
              En VanguardIA.dev somos especialistas en convertir la complejidad de la IA en soluciones simples que generan resultados reales. Creamos chatbots inteligentes, AI wrappers rentables y aplicaciones con IA integrada para empresas que quieren crecer con tecnología que trabaja 24/7.
            </p>
            <p className="text-lg md:text-xl text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-6">
              Gracias a la IA, desarrollamos 40% más rápido sin comprometer calidad. Desde e-commerce hasta clínicas, nuestras soluciones automatizan procesos y generan nuevas fuentes de ingresos.
            </p>
            <p className="text-lg md:text-xl text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-12 italic font-medium">
              Nuestra filosofía: La IA más poderosa es la que trabaja silenciosamente en tu negocio, generando valor cada día.
            </p>
            
            {/* Interactive Chat Demo */}
            <motion.div
              id="chatbot"
              className="mt-8"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <AnimatedAIChat />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function Demo() {
  return <SplineSceneBasic />;
} 