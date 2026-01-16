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
