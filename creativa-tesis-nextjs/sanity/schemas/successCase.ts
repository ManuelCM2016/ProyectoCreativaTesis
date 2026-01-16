export default {
    name: 'successCase',
    title: 'Caso de Éxito',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'personName',
            title: 'Nombre de la Persona',
            type: 'string',
        },
        {
            name: 'career',
            title: 'Carrera',
            type: 'string',
        },
        {
            name: 'university',
            title: 'Universidad',
            type: 'string',
        },
        {
            name: 'thesisTopic',
            title: 'Tema de Tesis',
            type: 'text',
            rows: 2,
        },
        {
            name: 'quote',
            title: 'Testimonio/Cita',
            type: 'text',
            rows: 3,
        },
        {
            name: 'avatar',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'resultsBadges',
            title: 'Logros/Badges',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Ej: "Aprobado con honores", "Publicación en revista"',
        },
        {
            name: 'content',
            title: 'Historia Completa',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                },
            ],
        },
        {
            name: 'seoTitle',
            title: 'SEO Título',
            type: 'string',
        },
        {
            name: 'seoDescription',
            title: 'SEO Descripción',
            type: 'text',
            rows: 2,
        },
        {
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'personName',
            media: 'avatar',
        },
    },
};
