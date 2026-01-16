// Google Gemini AI Integration for Chatbot

const GEMINI_API_KEY = 'AIzaSyCQsvAFuyW-6NZUQdbdAgYbJU1EzIC6jGw';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
}

export async function chatWithGemini(
    userMessage: string,
    conversationHistory: Array<{ sender: string; text: string }> = []
): Promise<string> {
    try {
        // Construir contexto de la conversación
        const context = conversationHistory
            .slice(-4) // Solo últimos 4 mensajes para no exceder límites
            .map((msg) => `${msg.sender === 'user' ? 'Usuario' : 'CreativaBot'}: ${msg.text}`)
            .join('\n');

        // Prompt del sistema con personalidad y conocimiento de Creativa Tesis
        const systemPrompt = `
Eres CreativaBot, el asistente virtual inteligente de Creativa Tesis, una empresa de asesoría académica en Tacna, Perú.

TU PERSONALIDAD:
- Amigable, profesional y motivador
- Usas emojis de manera natural (pero sin exceso)
- Respondes de forma clara y concisa
- Eres experto en tesis universitarias

SERVICIOS QUE OFRECE CREATIVA TESIS:
1. 📝 Asesoría en elección de tema de tesis
2. 📊 Metodología de investigación (cuantitativa/cualitativa)
3. 📈 Análisis estadístico (SPSS, R, Excel)
4. ✍️ Redacción y corrección de estilo (normas APA)
5. 🎯 Preparación para sustentación
6. 📅 Planificación de cronogramas
7. 🔍 Revisión anti-plagio
8. 💡 Marco teórico y estado del arte

UBICACIÓN: Tacna, Perú (trabajamos con universidades locales: UNJBG, UPT, UAP)

INSTRUCCIONES:
- Si el usuario pregunta sobre servicios, menciona los relevantes
- Si pide ayuda específica, ofrece agendar una consulta gratuita
- Si menciona "agendar", "cita", "asesoría", di: "¡Perfecto! Para agendarte necesito algunos datos. ¿Cuál es tu nombre completo?"
- Responde en máximo 3-4 líneas (conciso)
- Usa un tono motivador y positivo
- Si no sabes algo, sé honesto y ofrece conectarlo con un asesor

HISTORIAL DE LA CONVERSACIÓN:
${context || 'Primera interacción'}

MENSAJE ACTUAL DEL USUARIO:
${userMessage}

RESPONDE de manera útil, profesional y motivadora:`;

        // Llamar a Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: systemPrompt,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300,
                    topP: 0.8,
                    topK: 40,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data: GeminiResponse = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        }

        throw new Error('No response from Gemini');
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Retornar un mensaje de error amigable
        return '🤔 Perdona, tuve un pequeño problema técnico. ¿Podrías reformular tu pregunta? O si prefieres, puedo conectarte con un asesor real para ayudarte mejor. 😊';
    }
}

// Función para abrir WhatsApp con mensaje pre-formateado
export function sendToWhatsApp(userInfo: {
    name: string;
    email: string;
    phone: string;
    career: string;
    topic: string;
}) {
    const whatsappNumber = '51987654321'; // Número de Creativa Tesis (cambiar por el real)

    const message = `
🎓 *NUEVA CONSULTA - CREATIVA TESIS*

👤 *Datos del Cliente:*
• Nombre: ${userInfo.name}
• Email: ${userInfo.email}
• Teléfono: ${userInfo.phone}
• Carrera: ${userInfo.career}

📝 *Consulta:*
${userInfo.topic}

⏰ *Solicita:* Agendar asesoría gratuita

---
_Enviado desde chatbot web_
  `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank');
}
