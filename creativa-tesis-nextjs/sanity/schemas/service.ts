export default {
    name: 'service',
    title: 'Servicio',
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
            description: 'Debe coincidir con las rutas: tesis-pregrado, tesis-postgrado, etc.',
        },
        {
            name: 'content',
            title: 'Contenido',
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
            subtitle: 'slug.current',
        },
    },
};
