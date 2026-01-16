export default {
    name: 'post',
    title: 'Blog Post',
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
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: [{ type: 'advisor' }],
        },
        {
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'excerpt',
            title: 'Extracto',
            type: 'text',
            rows: 3,
        },
        {
            name: 'publishedAt',
            title: 'Fecha de Publicación',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
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
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        },
        {
            name: 'seoTitle',
            title: 'SEO Título',
            type: 'string',
            description: 'Dejar vacío para usar el título del post',
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
            description: 'Dejar vacío para usar la imagen principal',
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { author } = selection;
            return { ...selection, subtitle: author && `por ${author}` };
        },
    },
};
