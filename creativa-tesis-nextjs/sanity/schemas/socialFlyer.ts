// ─── Social Flyer — Vitrina de Redes Sociales ────────────────────────────────
// Cada documento representa un flyer/post publicado en Instagram/Facebook.
// Se muestran en la galería de "Blog y Recursos" y los destacados en Inicio.

export default {
    name: 'socialFlyer',
    title: '🎨 Flyers de Redes Sociales',
    type: 'document',

    // ── Agrupar campos en secciones con fieldsets ──────────────────────────
    fieldsets: [
        {
            name: 'content',
            title: '📄 Contenido del Flyer',
            options: { collapsible: true, collapsed: false },
        },
        {
            name: 'classification',
            title: '🏷️ Clasificación',
            options: { collapsible: true, collapsed: false },
        },
        {
            name: 'publication',
            title: '📅 Publicación y Visibilidad',
            options: { collapsible: true, collapsed: false },
        },
    ],

    fields: [
        // ── Contenido ──────────────────────────────────────────────────────
        {
            name: 'title',
            title: 'Título del Flyer',
            type: 'string',
            fieldset: 'content',
            description: 'Nombre descriptivo para identificarlo en el panel (ej: "Tesis de Ingeniería Civil - Enero 2025")',
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: 'image',
            title: 'Imagen del Flyer',
            type: 'image',
            fieldset: 'content',
            description: 'Sube el flyer en alta resolución (PNG o JPG recomendado, mínimo 800x800px)',
            options: {
                hotspot: true,
                accept: 'image/*',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'caption',
            title: 'Texto descriptivo (opcional)',
            type: 'text',
            fieldset: 'content',
            rows: 2,
            description: 'Breve descripción del mensaje del flyer. Aparece como tooltip en la galería.',
        },
        {
            name: 'linkUrl',
            title: 'Enlace (opcional)',
            type: 'url',
            fieldset: 'content',
            description: 'URL a la que redirecciona al hacer clic (ej: post de Instagram, WhatsApp, etc.)',
        },

        // ── Clasificación ──────────────────────────────────────────────────
        {
            name: 'category',
            title: 'Categoría',
            type: 'string',
            fieldset: 'classification',
            description: 'Selecciona la categoría principal del flyer para los filtros de la galería',
            options: {
                list: [
                    { title: '🎓 Servicio por Carrera', value: 'servicio-carrera' },
                    { title: '💡 Consejos y Tips', value: 'consejos-tips' },
                    { title: '⚡ Motivación / Urgencia', value: 'motivacion' },
                    { title: '🏫 Alianzas Universitarias', value: 'alianzas-universitarias' },
                    { title: '🎉 Campañas Especiales', value: 'campanas-especiales' },
                    { title: '📸 Comunidad / Marca', value: 'comunidad-marca' },
                ],
                layout: 'radio',
                direction: 'vertical',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'tags',
            title: 'Etiquetas adicionales',
            type: 'array',
            fieldset: 'classification',
            description: 'Palabras clave para búsqueda interna (ej: "UCV", "APA", "San Valentín")',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },

        // ── Publicación ────────────────────────────────────────────────────
        {
            name: 'featured',
            title: '⭐ Destacado en la página de Inicio',
            type: 'boolean',
            fieldset: 'publication',
            description: 'Activa esta opción para que aparezca en la sección "Vitrina Social" de la página principal. Máximo 6 recomendados.',
            initialValue: false,
        },
        {
            name: 'order',
            title: 'Orden de aparición',
            type: 'number',
            fieldset: 'publication',
            description: 'Número menor = aparece primero. Los flyers destacados se ordenan por este campo.',
            validation: (Rule: any) => Rule.integer().min(0),
        },
        {
            name: 'publishedAt',
            title: 'Fecha de publicación original',
            type: 'datetime',
            fieldset: 'publication',
            description: 'Fecha en que fue publicado en redes sociales',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'active',
            title: '✅ Activo (visible en la galería)',
            type: 'boolean',
            fieldset: 'publication',
            description: 'Desactiva para ocultar el flyer de la galería sin borrarlo.',
            initialValue: true,
        },
    ],

    // ── Vista previa en el panel de Sanity ─────────────────────────────────
    preview: {
        select: {
            title: 'title',
            category: 'category',
            featured: 'featured',
            active: 'active',
            media: 'image',
        },
        prepare(selection: any) {
            const { title, category, featured, active, media } = selection;

            const categoryLabels: Record<string, string> = {
                'servicio-carrera': '🎓 Por Carrera',
                'consejos-tips': '💡 Tips',
                'motivacion': '⚡ Motivación',
                'alianzas-universitarias': '🏫 Alianzas',
                'campanas-especiales': '🎉 Campaña',
                'comunidad-marca': '📸 Comunidad',
            };

            const prefix = featured ? '⭐ ' : active ? '' : '🚫 ';
            const cat = categoryLabels[category] ?? category ?? '—';

            return {
                title: `${prefix}${title}`,
                subtitle: cat,
                media,
            };
        },
    },

    // ── Ordenamiento por defecto en el Studio ─────────────────────────────
    orderings: [
        {
            title: 'Orden de aparición',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Más recientes primero',
            name: 'publishedDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Destacados primero',
            name: 'featuredFirst',
            by: [
                { field: 'featured', direction: 'desc' },
                { field: 'order', direction: 'asc' },
            ],
        },
    ],
};
