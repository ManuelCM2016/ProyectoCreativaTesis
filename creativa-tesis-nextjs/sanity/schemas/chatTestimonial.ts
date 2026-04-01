export default {
    name: 'chatTestimonial',
    title: 'Testimonio de Chat (WhatsApp)',
    type: 'document',
    icon: () => '💬',
    fields: [
        {
            name: 'studentName',
            title: 'Nombre del Alumno',
            type: 'string',
            description: 'Ej: "Karla", "Miguel Ángel"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'universityInfo',
            title: 'Carrera / Universidad',
            type: 'string',
            description: 'Ej: "Medicina - UPT", "Derecho - UNJBG"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'highlightText',
            title: 'Frase del Logro',
            type: 'string',
            description: 'Frase corta y poderosa. Ej: "¡Aprobé al 100%!", "Tesis lista en 4 meses"',
            validation: (Rule: any) => Rule.required().max(80),
        },
        {
            name: 'emojiBadge',
            title: 'Emoji Representativo',
            type: 'string',
            description: 'Un solo emoji. Ej: 🎓, 🎉, ❤️, 🏆',
            validation: (Rule: any) => Rule.required().max(4),
        },
        {
            name: 'chatScreenshot',
            title: 'Captura de Chat (WhatsApp)',
            type: 'image',
            description: 'Sube la captura de pantalla del chat de WhatsApp.',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'order',
            title: 'Orden de Aparición',
            type: 'number',
            description: 'Número menor aparece primero.',
            initialValue: 0,
        },
    ],
    orderings: [
        {
            title: 'Orden Manual',
            name: 'manualOrder',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'studentName',
            subtitle: 'universityInfo',
            media: 'chatScreenshot',
        },
    },
};
