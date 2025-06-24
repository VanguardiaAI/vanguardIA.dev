"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Paperclip,
    SendIcon,
    XIcon,
    LoaderIcon,
    Command,
    Smartphone,
    Globe,
    Calculator,
    User,
    Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import { useAuth } from "@/hooks/useAuth";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <div className={cn(
        "relative",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-purple-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {props.onChange && (
          <div 
            className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-purple-500 rounded-full"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [messages, setMessages] = useState<Array<{id: string, text: string, type: 'user' | 'bot', timestamp: Date}>>([]);
    
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    
    // Hook de autenticación
    const { user, isAuthenticated, isLoading, signIn, sendMessage } = useAuth();

    const commandSuggestions: CommandSuggestion[] = useMemo(() => [
        { 
            icon: <Globe className="w-4 h-4" />, 
            label: "Desarrollo Web", 
            description: "Sitios web, plataformas y aplicaciones web", 
            prefix: "/web" 
        },
        { 
            icon: <Smartphone className="w-4 h-4" />, 
            label: "App Móvil", 
            description: "Aplicaciones iOS y Android", 
            prefix: "/app" 
        },
        { 
            icon: <Bot className="w-4 h-4" />, 
            label: "Integración IA", 
            description: "Chatbots, automatización y AI", 
            prefix: "/ai" 
        },
        { 
            icon: <Calculator className="w-4 h-4" />, 
            label: "Presupuesto Específico", 
            description: "Cotización detallada de proyecto", 
            prefix: "/budget" 
        },
        { 
            icon: <User className="w-4 h-4" />, 
            label: "Hablar con Humano", 
            description: "Conectar con nuestro equipo", 
            prefix: "/human" 
        },
    ], []);

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            
            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }
    }, [value, commandSuggestions]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');
            
            if (commandPaletteRef.current && 
                !commandPaletteRef.current.contains(target) && 
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev < commandSuggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : commandSuggestions.length - 1
                );
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = async () => {
        if (!value.trim()) return;
        
        // Verificar si el usuario está autenticado
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        
        const messageText = value.trim();
        const messageId = Date.now().toString();
        
        // Agregar mensaje del usuario
        const userMessage = {
            id: messageId,
            text: messageText,
            type: 'user' as const,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setValue("");
        adjustHeight(true);
        setIsTyping(true);
        
        try {
            // Enviar mensaje al backend
            const response = await sendMessage(messageText);
            
            // Agregar respuesta del bot
            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: response.message,
                type: 'bot' as const,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            
            // Mostrar mensaje de error
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
                type: 'bot' as const,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleLogin = async () => {
        try {
            await signIn();
            setShowLoginModal(false);
        } catch (error) {
            console.error('Error en login:', error);
        }
    };



    const handleAttachFile = () => {
        const mockFileName = `documento-${Math.floor(Math.random() * 1000)}.pdf`;
        setAttachments(prev => [...prev, mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };
    
    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
    };

    return (
        <div className="h-screen w-full bg-transparent text-white relative overflow-hidden">
            {/* Gradiente superior - Más sutil y solo en desktop */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black via-black/30 to-transparent z-30 pointer-events-none" />
            
            {/* Gradiente inferior - Más sutil y solo en desktop */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/30 to-transparent z-30 pointer-events-none" />
            
            {/* Contenido Principal - Sin scroll, altura fija */}
            <div className="h-full flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
                    <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
                </div>
                
                <div className="w-full max-w-4xl mx-auto relative z-20">
                    <motion.div 
                        className="relative z-20 space-y-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-block"
                            >
                                <h1 className="text-5xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-2">
                                    Cuéntanos tu proyecto
                                </h1>
                                <motion.div 
                                    className="h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </motion.div>
                            <motion.p 
                                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Describe tu idea y obtén un presupuesto personalizado en 24-48h
                            </motion.p>
                        </div>

                        <motion.div 
                            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-3xl border border-white/[0.05] shadow-2xl max-w-3xl mx-auto overflow-hidden"
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            {/* Efecto de luz radial */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: (isHovered || isClicked) ? 1 : 0 
                                }}
                                transition={{ 
                                    duration: 1.2, 
                                    ease: "easeInOut" 
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-radial from-purple-500/[0.08] via-purple-500/[0.03] to-transparent opacity-60" />
                                <div className="absolute inset-0 bg-gradient-radial from-blue-400/[0.05] via-transparent to-transparent opacity-40" />
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-radial from-white/[0.02] via-transparent to-transparent"
                                    animate={{
                                        scale: (isHovered || isClicked) ? [1, 1.05, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: (isHovered || isClicked) ? Infinity : 0,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                            
                            {/* Borde con efecto de brillo */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: (isHovered || isClicked) ? 1 : 0 
                                }}
                                transition={{ 
                                    duration: 0.8, 
                                    ease: "easeInOut" 
                                }}
                            >
                                <div className="absolute inset-0 rounded-3xl border border-purple-400/20 shadow-lg shadow-purple-500/10" />
                                <motion.div 
                                    className="absolute inset-0 rounded-3xl border border-blue-400/10"
                                    animate={{
                                        opacity: (isHovered || isClicked) ? [0.3, 0.6, 0.3] : 0,
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: (isHovered || isClicked) ? Infinity : 0,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                            <AnimatePresence>
                                {showCommandPalette && (
                                    <motion.div 
                                        ref={commandPaletteRef}
                                        className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-black/90 rounded-lg z-50 shadow-lg border border-white/10 overflow-hidden"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <div className="py-1 bg-black/95">
                                            {commandSuggestions.map((suggestion, index) => (
                                                <motion.div
                                                    key={suggestion.prefix}
                                                    className={cn(
                                                        "flex items-center gap-3 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                        activeSuggestion === index 
                                                            ? "bg-purple-500/20 text-white" 
                                                            : "text-white/70 hover:bg-white/5"
                                                    )}
                                                    onClick={() => selectCommandSuggestion(index)}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.03 }}
                                                >
                                                    <div className="w-5 h-5 flex items-center justify-center text-purple-400">
                                                        {suggestion.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{suggestion.label}</div>
                                                        <div className="text-white/40 text-xs">{suggestion.description}</div>
                                                    </div>
                                                    <div className="text-white/40 text-xs">
                                                        {suggestion.prefix}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6 md:p-8 relative z-40">
                                <Textarea
                                    ref={textareaRef}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        adjustHeight();
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => {
                                        setInputFocused(true);
                                        setIsClicked(true);
                                    }}
                                    onBlur={() => {
                                        setInputFocused(false);
                                        // Mantener isClicked como true para conservar el efecto
                                        // setIsClicked(false);
                                    }}
                                    onClick={() => setIsClicked(true)}
                                    placeholder="Describe tu proyecto o idea... ej: 'Necesito una app móvil para mi restaurante'"
                                    containerClassName="w-full"
                                    className={cn(
                                        "w-full px-6 py-4",
                                        "resize-none",
                                        "bg-transparent",
                                        "border-none",
                                        "text-white/90 text-base md:text-lg",
                                        "focus:outline-none",
                                        "placeholder:text-white/30",
                                        "min-h-[80px] md:min-h-[100px]",
                                        "leading-relaxed",
                                        "transition-all duration-500 ease-in-out"
                                    )}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                    showRing={false}
                                />
                            </div>

                            <AnimatePresence>
                                {attachments.length > 0 && (
                                    <motion.div 
                                        className="px-4 pb-3 flex gap-2 flex-wrap"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {attachments.map((file, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-2 text-xs bg-white/[0.03] py-1.5 px-3 rounded-lg text-white/70 border border-white/[0.05]"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                            >
                                                <span>{file}</span>
                                                <button 
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-white/40 hover:text-white transition-colors"
                                                >
                                                    <XIcon className="w-3 h-3" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6 md:p-8 border-t border-white/[0.05] flex items-center justify-between gap-6 relative z-40">
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        type="button"
                                        onClick={handleAttachFile}
                                        whileTap={{ scale: 0.94 }}
                                        className="p-2 text-white/40 hover:text-purple-400 rounded-lg transition-colors relative group"
                                        title="Adjuntar archivo (opcional)"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                        <motion.span
                                            className="absolute inset-0 bg-purple-500/[0.1] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        data-command-button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowCommandPalette(prev => !prev);
                                        }}
                                        whileTap={{ scale: 0.94 }}
                                        className={cn(
                                            "p-2 text-white/40 hover:text-purple-400 rounded-lg transition-colors relative group",
                                            showCommandPalette && "bg-purple-500/20 text-purple-400"
                                        )}
                                        title="Ver comandos rápidos"
                                    >
                                        <Command className="w-4 h-4" />
                                        <motion.span
                                            className="absolute inset-0 bg-purple-500/[0.1] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
                                    </motion.button>
                                </div>
                                
                                <motion.button
                                    type="button"
                                    onClick={handleSendMessage}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isTyping || !value.trim()}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-base font-medium transition-all",
                                        "flex items-center gap-3",
                                        value.trim()
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
                                            : "bg-white/[0.05] text-white/40"
                                    )}
                                >
                                    {isTyping ? (
                                        <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                    ) : (
                                        <SendIcon className="w-4 h-4" />
                                    )}
                                    <span>Enviar</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {commandSuggestions.map((suggestion, index) => (
                                <motion.button
                                    key={suggestion.prefix}
                                    onClick={() => selectCommandSuggestion(index)}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] hover:bg-purple-500/[0.1] rounded-lg text-sm text-white/60 hover:text-white/90 transition-all relative group border border-white/[0.05] hover:border-purple-500/30"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-purple-400">{suggestion.icon}</span>
                                    <span>{suggestion.label}</span>
                                    <motion.div
                                        className="absolute inset-0 border border-purple-500/[0.2] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={false}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isTyping && (
                    <motion.div 
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl bg-black/[0.7] rounded-full px-4 py-2 shadow-lg border border-purple-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-7 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center text-center border border-purple-500/30">
                                <span className="text-xs font-medium text-purple-400 mb-0.5">AI</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <span>Analizando tu proyecto</span>
                                <TypingDots />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {inputFocused && (
                <motion.div 
                    className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[96px]"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}

            {/* Modal de Login */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLoginModal(false)}
                    >
                        <motion.div 
                            className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
                                    <p className="text-white/60">
                                        Inicia sesión con Google para usar el chatbot y obtener presupuestos personalizados
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <motion.button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isLoading ? (
                                            <LoaderIcon className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                        )}
                                        <span>Continuar con Google</span>
                                    </motion.button>
                                    
                                    <button
                                        onClick={() => setShowLoginModal(false)}
                                        className="w-full px-6 py-3 text-white/60 hover:text-white transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Área de Mensajes */}
            <AnimatePresence>
                {messages.length > 0 && (
                    <motion.div 
                        className="fixed bottom-0 left-0 right-0 max-h-[50vh] bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-y-auto"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="container mx-auto px-6 py-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3",
                                        message.type === 'user' ? "justify-end" : "justify-start"
                                    )}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {message.type === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                                            AI
                                        </div>
                                    )}
                                    
                                    <div className={cn(
                                        "max-w-[70%] px-4 py-2 rounded-2xl",
                                        message.type === 'user' 
                                            ? "bg-purple-500 text-white" 
                                            : "bg-white/10 text-white/90"
                                    )}>
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    
                                    {message.type === 'user' && user && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            {user.picture ? (
                                                <picture>
                                                    <img 
                                                        src={user.picture} 
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </picture>
                                            ) : (
                                                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(168, 85, 247, 0.3)"
                    }}
                />
            ))}
        </div>
    );
}



const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = rippleKeyframes;
    document.head.appendChild(style);
} 