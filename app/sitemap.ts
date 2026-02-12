import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { articlesQuery, productsQuery } from '@/lib/sanity/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kroma.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all articles and products from Sanity
    const articles = await client.fetch(articlesQuery)
    const products = await client.fetch(productsQuery)

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/ciencia`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/productos`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]

    // Article pages
    const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
        url: `${SITE_URL}/article/${article.slug.current}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Product pages
    const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${SITE_URL}/shop/${product.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...articlePages, ...productPages]
}
