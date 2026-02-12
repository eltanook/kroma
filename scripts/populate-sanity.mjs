// Script para popular Sanity con contenido de ejemplo
// Ejecuta: node --env-file=.env.local scripts/populate-sanity.mjs

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '82mx3a0n',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Necesitas crear un token en Sanity Studio
    useCdn: false,
})

const articles = [
    {
        _type: 'article',
        title: 'BPA y Disruptores Hormonales: La Amenaza Invisible',
        slug: { current: 'bpa-disruptores-hormonales' },
        category: 'salud',
        excerpt:
            'El Bisfenol A (BPA) es un químico presente en casi todos los plásticos. Estudios demuestran su impacto directo en tu sistema endocrino.',
        publishedAt: new Date().toISOString(),
        author: 'KROMA',
        content: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'El BPA es uno de los disruptores endocrinos más estudiados y peligrosos en materiales plásticos de uso cotidiano.',
                    },
                ],
            },
        ],
    },
    {
        _type: 'article',
        title: 'Microplásticos en Sangre: El Estudio que Cambió Todo',
        slug: { current: 'microplasticos-sangre' },
        category: 'ciencia',
        excerpt:
            'Investigación holandesa encuentra microplásticos en el 77% de muestras de sangre humana.',
        publishedAt: new Date().toISOString(),
        author: 'KROMA',
        content: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'Un estudio revolucionario de la Universidad de Amsterdam detectó partículas plásticas en la sangre humana.',
                    },
                ],
            },
        ],
    },
    {
        _type: 'article',
        title: 'Testosterona en Caída: El Enlace con Plásticos',
        slug: { current: 'testosterona-plasticos' },
        category: 'salud',
        excerpt:
            'Los niveles de testosterona han caído 50% en 40 años. El plástico podría ser responsable.',
        publishedAt: new Date().toISOString(),
        author: 'KROMA',
        content: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'Los ftalatos presentes en plásticos están directamente relacionados con la caída hormonal masculina.',
                    },
                ],
            },
        ],
    },
]

const products = [
    {
        _type: 'product',
        name: 'Botella Térmica KROMA',
        slug: { current: 'botella-termica-kroma' },
        category: 'botellas',
        price: 3500,
        description:
            'Botella térmica de acero inoxidable 304 con doble pared. Mantiene bebidas frías 24h y calientes 12h.',
        features: [
            'Acero inoxidable 304 médico',
            'Libre de BPA y ftalatos',
            'Doble pared con vacío',
            'Capacidad 750ml',
            'Tapa hermética',
        ],
        inStock: true,
        featured: true,
    },
    {
        _type: 'product',
        name: 'Contenedor Hermético Vidrio',
        slug: { current: 'contenedor-vidrio' },
        category: 'contenedores',
        price: 2800,
        description:
            'Contenedor de vidrio borosilicato con tapa de acero inoxidable. Perfecto para almacenamiento seguro.',
        features: [
            'Vidrio borosilicato resistente',
            'Tapa acero inoxidable',
            'Apto microondas y lavavajillas',
            'Sin plástico',
            '950ml de capacidad',
        ],
        inStock: true,
        featured: true,
    },
    {
        _type: 'product',
        name: 'Set Cubiertos Acero',
        slug: { current: 'set-cubiertos' },
        category: 'utensilios',
        price: 1500,
        description: 'Set de cubiertos portátiles de acero inoxidable 304 con estuche de tela.',
        features: [
            'Acero inoxidable 304',
            'Incluye cuchara, tenedor, cuchillo',
            'Estuche de lona',
            'Ultra liviano',
            'Ideal para viaje',
        ],
        inStock: true,
        featured: false,
    },
]

async function populate() {
    try {
        console.log('🚀 Creando artículos...')
        for (const article of articles) {
            const result = await client.create(article)
            console.log(`✅ Artículo creado: ${result.title}`)
        }

        console.log('\n🚀 Creando productos...')
        for (const product of products) {
            const result = await client.create(product)
            console.log(`✅ Producto creado: ${result.name}`)
        }

        console.log('\n🎉 ¡Contenido creado exitosamente!')
    } catch (error) {
        console.error('❌ Error:', error)
    }
}

populate()
