export default {
    name: 'advisor',
    title: 'Asesor',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Rol/Carrera',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Biografía',
            type: 'text',
            rows: 4,
        },
        {
            name: 'photo',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'specialties',
            title: 'Especialidades',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'yearsOfExperience',
            title: 'Años de Experiencia',
            type: 'number',
            validation: (Rule: any) => Rule.min(0),
        },
        {
            name: 'corporateEmail',
            title: 'Email Corporativo',
            type: 'string',
            validation: (Rule: any) => Rule.email(),
        },
        {
            name: 'socialMedia',
            title: 'Redes Sociales',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Plataforma',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Facebook', value: 'facebook' },
                                ],
                            },
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        },
                    ],
                    preview: {
                        select: {
                            platform: 'platform',
                            url: 'url',
                        },
                        prepare({ platform, url }: any) {
                            return {
                                title: platform,
                                subtitle: url,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'order',
            title: 'Orden',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'photo',
        },
    },
};
