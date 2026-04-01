import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'homeIntro',
    title: 'Home - Sección Intro (Enfoque)',
    type: 'document',
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Etiqueta superior (Eyebrow)',
            type: 'string',
            initialValue: 'Nuestra Metodología',
        }),
        defineField({
            name: 'headlineRaw',
            title: 'Título principal (Normal)',
            type: 'string',
            initialValue: 'Un enfoque que',
        }),
        defineField({
            name: 'headlineHighlight',
            title: 'Palabra resaltada (Color azul)',
            type: 'string',
            initialValue: 'transforma',
        }),
        defineField({
            name: 'headlineEnd',
            title: 'Final del título',
            type: 'string',
            initialValue: 'tu investigación',
        }),
        defineField({
            name: 'paragraph1',
            title: 'Párrafo 1',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'paragraph2',
            title: 'Párrafo 2',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'ctaText',
            title: 'Texto del Botón',
            type: 'string',
            initialValue: 'Conoce nuestro proceso',
        }),
        defineField({
            name: 'ctaLink',
            title: 'Enlace del Botón',
            type: 'string',
            initialValue: '/creativa-tesis/quienes-somos',
        }),
        // --- SECCIÓN VISUAL (Video o Imagen) ---
        defineField({
            name: 'mediaType',
            title: 'Tipo de Media',
            type: 'string',
            options: {
                list: [
                    { title: 'Video (YouTube/FB/IG)', value: 'video' },
                    { title: 'Imagen Fija', value: 'image' },
                ],
                layout: 'radio',
            },
            initialValue: 'image',
        }),
        defineField({
            name: 'image',
            title: 'Imagen estática',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ parent }) => parent?.mediaType !== 'image',
        }),
        defineField({
            name: 'video',
            title: 'Configuración de Video',
            type: 'object',
            hidden: ({ parent }) => parent?.mediaType !== 'video',
            fields: [
                {
                    name: 'platform',
                    title: 'Plataforma',
                    type: 'string',
                    options: {
                        list: [
                            { title: '🎥 YouTube', value: 'youtube' },
                            { title: '📘 Facebook', value: 'facebook' },
                            { title: '📸 Instagram', value: 'instagram' },
                        ],
                    },
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'url',
                    title: 'URL del Video',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'aspectRatio',
                    title: 'Relación de Aspecto',
                    type: 'string',
                    options: {
                        list: [
                            { title: '↔️ Horizontal (16:9)', value: '16:9' },
                            { title: '↕️ Vertical (9:16)', value: '9:16' },
                            { title: '🔲 Cuadrado (1:1)', value: '1:1' },
                        ],
                    },
                    initialValue: '16:9',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'thumbnail',
                    title: 'Miniatura de carga (opcional)',
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Home - Sección "Un enfoque..."',
                subtitle: 'Configuración de la segunda sección de inicio',
            };
        },
    },
});
