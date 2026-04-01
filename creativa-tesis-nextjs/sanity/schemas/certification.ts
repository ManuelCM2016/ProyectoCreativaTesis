export default {
    name: 'certification',
    title: 'Institución / Certificación',
    type: 'document',
    icon: () => '🏛️',
    fields: [
        {
            name: 'name',
            title: 'Nombre Corto',
            type: 'string',
            description: 'Ej: "UNMSM", "Turnitin", "CONCYTEC"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'fullName',
            title: 'Nombre Completo',
            type: 'string',
            description: 'Ej: "Universidad Nacional Mayor de San Marcos"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Logo (PNG transparente)',
            type: 'image',
            description: 'Sube el logo en formato PNG con fondo transparente.',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Universidad', value: 'universidad' },
                    { title: 'Institución', value: 'institucion' },
                    { title: 'Software', value: 'software' },
                ],
                layout: 'radio',
            },
            initialValue: 'universidad',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'url',
            title: 'Sitio Web (opcional)',
            type: 'url',
            description: 'Link al sitio oficial de la institución.',
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
            title: 'name',
            subtitle: 'fullName',
            media: 'logo',
        },
    },
};
