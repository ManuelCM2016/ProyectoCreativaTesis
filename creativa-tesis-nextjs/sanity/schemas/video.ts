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
                    { title: 'TikTok', value: 'tiktok' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'URL del Video',
            type: 'url',
            description: 'Pega la URL completa del video (YouTube, Facebook o TikTok)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'orientation',
            title: 'Orientación',
            type: 'string',
            options: {
                list: [
                    { title: 'Horizontal (16:9)', value: 'horizontal' },
                    { title: 'Vertical (9:16)', value: 'vertical' },
                    { title: 'Cuadrado (1:1)', value: 'square' },
                ],
                layout: 'radio',
            },
            initialValue: 'horizontal',
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
            orientation: 'orientation',
        },
        prepare({ title, platform, orientation }) {
            const platformEmoji = {
                youtube: '📺',
                facebook: '📘',
                tiktok: '🎵',
            };
            const orientationLabel = {
                horizontal: '↔️',
                vertical: '↕️',
                square: '⬜',
            };
            return {
                title: title,
                subtitle: `${platformEmoji[platform as keyof typeof platformEmoji] || '🎬'} ${platform?.toUpperCase() || ''} ${orientationLabel[orientation as keyof typeof orientationLabel] || ''}`,
            };
        },
    },
});
