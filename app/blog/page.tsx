import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { client } from "@/lib/sanity/client"
import { articlesQuery } from "@/lib/sanity/queries"
import { BlogClient } from "@/components/kroma/blog-client"
import { blogMetadata } from "@/lib/seo/metadata"

// Revalidar cada 60 segundos
export const revalidate = 60

// SEO Metadata
export const metadata = blogMetadata

export default async function BlogPage() {
    // Fetch artículos desde Sanity
    const articles = await client.fetch(articlesQuery)

    // Transformar datos para el componente cliente
    const transformedArticles = articles.map((article: any) => ({
        title: article.title,
        excerpt: article.excerpt,
        image: article.mainImage || "/placeholder.svg",
        tag: article.category.toUpperCase(),
        category: article.category,
        date: new Date(article.publishedAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }),
        readTime: Math.ceil((article.content?.length || 0) / 200) + " min",
        slug: article.slug.current,
    }))

    // Featured article (el más reciente)
    const featuredArticle = transformedArticles[0]

    return (
        <main>
            <CustomCursor />
            <Navbar />
            <BlogClient articles={transformedArticles} featuredArticle={featuredArticle} />
            <Footer />
        </main>
    )
}
