import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'article',
    title: 'Artículos',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Ciencia', value: 'ciencia' },
                    { title: 'Salud', value: 'salud' },
                    { title: 'Sostenibilidad', value: 'sostenibilidad' },
                ],
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Texto Alternativo',
                    type: 'string',
                },
            ],
        }),
        defineField({
            name: 'excerpt',
            title: 'Extracto',
            type: 'text',
            rows: 4,
        }),
        defineField({
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
                            name: 'alt',
                            type: 'string',
                            title: 'Alt',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Fecha de Publicación',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            initialValue: 'KROMA',
        }),
        // SEO Fields
        defineField({
            name: 'metaTitle',
            title: 'Meta Title (SEO Override)',
            type: 'string',
            description: 'Optional - Overrides the article title for SEO. Leave empty to use article title.',
            validation: (Rule: any) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description (SEO)',
            type: 'text',
            description: 'Optional - Custom meta description for search engines. Leave empty to use excerpt.',
            validation: (Rule: any) => Rule.max(160),
        }),
        defineField({
            name: 'focusKeyword',
            title: 'Focus Keyword',
            type: 'string',
            description: 'Main SEO keyword for this article',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'category',
        },
    },
})
