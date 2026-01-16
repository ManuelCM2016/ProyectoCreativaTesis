'use client';

import { useState, useRef, useEffect } from 'react';
import { chatWithGemini, sendToWhatsApp } from '@/lib/gemini';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface UserInfo {
    name: string;
    email: string;
    phone: string;
    career: string;
    topic: string;
}

const quickSuggestions = [
    '¿Cómo elijo mi tema de tesis?',
    'Necesito ayuda con la metodología',
    '¿Cuánto tiempo toma una tesis?',
    'Quiero agendar una asesoría',
];

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [collectingInfo, setCollectingInfo] = useState(false);
    const [infoStep, setInfoStep] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        email: '',
        phone: '',
        career: '',
        topic: '',
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize welcome message after mount to avoid hydration errors
    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: '¡Hola! 👋 Soy CreativaBot, tu asistente virtual con IA. Estoy aquí para ayudarte con tu tesis. ¿En qué puedo ayudarte hoy?',
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInfoCollection = (userMessage: string): string => {
        switch (infoStep) {
            case 1: // Nombre
                setUserInfo((prev) => ({ ...prev, name: userMessage }));
                setInfoStep(2);
                return '📧 Perfecto! ¿Cuál es tu correo electrónico?';

            case 2: // Email
                setUserInfo((prev) => ({ ...prev, email: userMessage }));
                setInfoStep(3);
                return '📱 ¿Y tu número de teléfono?';

            case 3: // Teléfono
                setUserInfo((prev) => ({ ...prev, phone: userMessage }));
                setInfoStep(4);
                return '🎓 ¿Qué carrera estás estudiando?';

            case 4: // Carrera
                setUserInfo((prev) => ({ ...prev, career: userMessage }));
                setInfoStep(5);
                return '📝 Por último, cuéntame brevemente ¿sobre qué tema necesitas asesoría?';

            case 5: // Topic
                const finalInfo = { ...userInfo, topic: userMessage };
                setUserInfo(finalInfo);
                setCollectingInfo(false);
                setInfoStep(0);

                // Enviar a WhatsApp
                setTimeout(() => sendToWhatsApp(finalInfo), 500);

                return `✅ ¡Perfecto, ${userInfo.name}! \n\nEstoy abriendo WhatsApp para que envíes tu consulta directamente a nuestro equipo de Creativa Tesis. \n\nSolo necesitas hacer click en "Enviar" en la ventana que se abrió. 📲\n\n¿Necesitas ayuda con algo más mientras tanto?`;

            default:
                return '';
        }
    };

    const handleSendMessage = async (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            let botResponseText: string;

            // Si estamos recopilando información
            if (collectingInfo) {
                botResponseText = handleInfoCollection(messageText);
            } else {
                // Detectar si quiere agendar cita
                const lowerMessage = messageText.toLowerCase();
                if (
                    lowerMessage.includes('agendar') ||
                    lowerMessage.includes('cita') ||
                    lowerMessage.includes('consulta gratuita') ||
                    lowerMessage.includes('asesoría gratis') ||
                    lowerMessage.includes('contactar')
                ) {
                    setCollectingInfo(true);
                    setInfoStep(1);
                    botResponseText = '¡Excelente decisión! 🎉 \n\nPara agendarte una consulta gratuita, necesito algunos datos.\n\n👤 ¿Cuál es tu nombre completo?';
                } else {
                    // Llamar a Gemini AI
                    const conversationHistory = messages.map((m) => ({
                        sender: m.sender,
                        text: m.text,
                    }));

                    botResponseText = await chatWithGemini(messageText, conversationHistory);
                }
            }

            // Simulate typing delay
            await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));

            const botMessage: Message = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: '😔 Lo siento, tuve un problema. ¿Podrías intentar de nuevo? Si el problema persiste, puedes contactarnos directamente por WhatsApp al +51 987 654 321.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] max-h-[600px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-primary-blue to-secondary-blue p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">CreativaBot AI</h3>
                                <p className="text-xs opacity-90 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 bg-gray-50 dark:bg-slate-800">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${message.sender === 'user'
                                        ? 'bg-primary-blue text-white rounded-br-sm'
                                        : 'bg-white dark:bg-slate-700 text-navy-text dark:text-white rounded-bl-sm shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                    <p
                                        className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '0ms' }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '150ms' }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: '300ms' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions (only show at start) */}
                    {messages.length === 1 && !collectingInfo && (
                        <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Preguntas frecuentes:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {quickSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(suggestion)}
                                        className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-navy-text dark:text-white px-3 py-1.5 rounded-full transition"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu pregunta..."
                                disabled={isTyping}
                                className="flex-1 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue disabled:opacity-50"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-xl">send</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 text-center">
                            Powered by Google Gemini AI 🤖
                        </p>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Tooltip (only when closed) */}
                {!isOpen && messages.length > 1 && (
                    <div className="absolute bottom-full right-0 mb-4 w-64 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10">
                        <p className="text-sm font-medium text-navy-text dark:text-white">¡Hola! 👋</p>
                        <p className="text-xs text-slate-500 mt-1 dark:text-gray-400">
                            Tengo IA para responder tus preguntas sobre tesis
                        </p>
                    </div>
                )}

                {/* Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary-blue text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-600 hover:shadow-xl"
                >
                    <span className="material-symbols-outlined text-[28px]">{isOpen ? 'close' : 'chat'}</span>

                    {/* Notification Badge */}
                    {!isOpen && messages.length > 1 && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                            1
                        </div>
                    )}

                    {/* AI Badge */}
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold text-white shadow-md">
                        AI
                    </div>
                </button>
            </div>
        </>
    );
}
