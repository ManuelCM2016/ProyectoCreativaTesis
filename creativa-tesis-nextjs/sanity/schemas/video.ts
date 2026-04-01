import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'video',
    title: 'Video',
    type: 'document',
    icon: () => '🎬',
    fields: [
        defineField({
            name: 'title',
            title: 'Título del Video',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'platform',
            title: 'Plataforma',
            type: 'string',
            options: {
                list: [
                    { title: 'YouTube', value: 'youtube' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Instagram', value: 'instagram' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'URL del Video',
            type: 'url',
            description: 'Pega la URL completa del video (YouTube, Facebook o Instagram)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'aspectRatio',
            title: 'Relación de Aspecto',
            type: 'string',
            description: 'Elige la proporción visual del reproductor',
            options: {
                list: [
                    { title: '↔️ Horizontal (16:9) — YouTube, Facebook', value: '16:9' },
                    { title: '↕️ Vertical (9:16) — Reels, Shorts, Stories', value: '9:16' },
                    { title: '⬜ Cuadrado (1:1)', value: '1:1' },
                ],
                layout: 'radio',
            },
            initialValue: '16:9',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Miniatura (opcional)',
            type: 'image',
            description: 'Se usará como preview antes de cargar el video',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'order',
            title: 'Orden de aparición',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'featured',
            title: 'Video destacado',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            platform: 'platform',
            aspectRatio: 'aspectRatio',
        },
        prepare({ title, platform, aspectRatio }) {
            const platformEmoji: Record<string, string> = {
                youtube: '📺',
                facebook: '📘',
                instagram: '📷',
            };
            return {
                title: title,
                subtitle: `${platformEmoji[platform] || '🎬'} ${platform?.toUpperCase() || ''} • ${aspectRatio || '16:9'}`,
            };
        },
    },
});
