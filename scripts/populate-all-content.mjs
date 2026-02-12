// Script completo para popular Sanity con TODO el contenido original
// Ejecuta: node --env-file=.env.local scripts/populate-all-content.mjs

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
    projectId: '82mx3a0n',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

// Leer datos de los archivos JSON backup
const articlesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/backup/blog-articles.json'), 'utf-8')
)
const productsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/backup/products.json'), 'utf-8')
)

// Función helper para convertir fechas
function parseDate(dateStr) {
    // "8 Feb 2026" -> Date object
    const months = {
        Ene: 0,
        Feb: 1,
        Mar: 2,
        Abr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Ago: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dic: 11,
    }

    const parts = dateStr.split(' ')
    const day = parseInt(parts[0])
    const month = months[parts[1]]
    const year = parseInt(parts[2])

    return new Date(year, month, day).toISOString()
}

// Mapear categorías de tags a categorías de schema
function mapCategory(tag) {
    const mapping = {
        SALUD: 'salud',
        CIENCIA: 'ciencia',
        MATERIALES: 'ciencia',
        GUIAS: 'sostenibilidad',
        INVESTIGACION: 'ciencia',
        HORMONAL: 'salud',
        PROTOCOLO: 'sostenibilidad',
    }
    return mapping[tag] || 'ciencia'
}

// Transformar artículos al formato de Sanity
const sanityArticles = [articlesData.featuredArticle, ...articlesData.articles].map(
    (article) => ({
        _type: 'article',
        title: article.title,
        slug: { current: article.slug },
        category: article.category || mapCategory(article.tag),
        excerpt: article.excerpt,
        publishedAt: parseDate(article.date),
        author: 'KROMA',
        content: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: article.excerpt,
                    },
                ],
            },
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'Este es un artículo fundamental sobre salud y materiales. KROMA investiga a fondo cada aspecto para brindarte la información más precisa y científicamente respaldada.',
                    },
                ],
            },
        ],
        // Note: mainImage necesitaría ser subida si quieres usar las imágenes reales
        // Por ahora las dejamos sin imagen para evitar complejidad
    })
)

// Transformar productos al formato de Sanity
const sanityProducts = productsData.products.map((product) => ({
    _type: 'product',
    name: product.name,
    slug: { current: product.slug },
    category: product.category,
    price: product.price,
    description: product.description,
    features: product.features,
    inStock: product.inStock !== undefined ? product.inStock : true,
    featured: product.featured !== undefined ? product.featured : false,
    // Note: images necesitarían ser subidas si quieres usar las imágenes reales
}))

async function populate() {
    try {
        console.log('🧹 Limpiando contenido previo...')

        // Obtener y eliminar artículos existentes
        const existingArticles = await client.fetch(`*[_type == "article"]{ _id }`)
        for (const doc of existingArticles) {
            await client.delete(doc._id)
            console.log(`✅ Artículo eliminado: ${doc._id}`)
        }

        // Obtener y eliminar productos existentes
        const existingProducts = await client.fetch(`*[_type == "product"]{ _id }`)
        for (const doc of existingProducts) {
            await client.delete(doc._id)
            console.log(`✅ Producto eliminado: ${doc._id}`)
        }

        console.log('\n🚀 Creando artículos...')
        for (const article of sanityArticles) {
            const result = await client.create(article)
            console.log(`✅ Artículo creado: ${result.title}`)
        }

        console.log('\n🚀 Creando productos...')
        for (const product of sanityProducts) {
            const result = await client.create(product)
            console.log(`✅ Producto creado: ${result.name} - $${result.price}`)
        }

        console.log('\n🎉 ¡Migración completa!')
        console.log(`📊 Total: ${sanityArticles.length} artículos + ${sanityProducts.length} productos`)
    } catch (error) {
        console.error('❌ Error:', error)
    }
}

populate()
