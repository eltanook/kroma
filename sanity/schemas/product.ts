import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Producto',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Imágenes',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Texto Alternativo',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'price',
            title: 'Precio',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'features',
            title: 'Características',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'inStock',
            title: 'En Stock',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'featured',
            title: 'Featured Product', // Changed title as per instruction
            type: 'boolean',
            initialValue: false,
        }),
        // SEO Fields
        defineField({
            name: 'metaDescription',
            title: 'Meta Description (SEO)',
            type: 'text',
            description: 'Optional - Custom meta description for search engines. Leave empty to use product description.',
            validation: (Rule) => Rule.max(160),
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
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Botellas', value: 'botellas' },
                    { title: 'Contenedores', value: 'contenedores' },
                    { title: 'Utensilios', value: 'utensilios' },
                    { title: 'Accesorios', value: 'accesorios' },
                ],
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'images.0',
            subtitle: 'category',
        },
    },
})
