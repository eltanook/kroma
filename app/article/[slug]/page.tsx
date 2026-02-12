import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { client } from "@/lib/sanity/client"
import { articlesQuery, articleBySlugQuery } from "@/lib/sanity/queries"
import { PortableText } from '@portabletext/react'
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { generateSEOMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema, generateJSONLD } from "@/lib/seo/schema"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

// Revalidar cada 60 segundos
export const revalidate = 60

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = await client.fetch(articleBySlugQuery, { slug })

    if (!article) return {}

    return generateSEOMetadata({
        title: article.title,
        description: article.excerpt || article.title,
        path: `/article/${slug}`,
        image: article.mainImage,
        type: 'article',
        publishedTime: article.publishedAt,
        keywords: [article.category, 'KROMA', 'salud', article.title],
    })
}

// Generate static params para todas las rutas posibles
export async function generateStaticParams() {
    const articles = await client.fetch(articlesQuery)
    return articles.map((article: any) => ({
        slug: article.slug.current,
    }))
}

export default async function ArticlePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const article = await client.fetch(articleBySlugQuery, { slug })

    if (!article) {
        notFound()
    }

    // Fetch artículos relacionados
    const relatedArticles = await client.fetch(
        `*[_type == "article" && category == $category && slug.current != $slug][0...3]{
            title,
            slug,
            excerpt,
            category,
            publishedAt
        }`,
        { category: article.category, slug }
    )

    // Generate JSON-LD schemas
    const articleSchema = generateArticleSchema({
        title: article.title,
        description: article.excerpt || article.title,
        slug,
        image: article.mainImage,
        publishedAt: article.publishedAt,
        author: article.author,
        category: article.category,
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Blog', url: '/blog' },
        { name: article.category, url: `/ciencia` },
        { name: article.title, url: `/article/${slug}` },
    ])

    return (
        <main>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD([articleSchema, breadcrumbSchema])}
            />

            <CustomCursor />
            <Navbar />

            <article className="min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-4xl px-6">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[
                        { name: 'Blog', url: '/blog' },
                        { name: article.category, url: '/ciencia' },
                        { name: article.title, url: `/article/${slug}` },
                    ]} />

                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al blog
                    </Link>

                    {/* Main Image - ARRIBA DE TODO */}
                    {article.mainImage && (
                        <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl">
                            <Image
                                src={article.mainImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 896px"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-orange-500 uppercase">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                            {article.author && (
                                <>
                                    <span>·</span>
                                    <span>{article.author}</span>
                                </>
                            )}
                        </div>

                        <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                            {article.title}
                        </h1>

                        {article.excerpt && (
                            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                                {article.excerpt}
                            </p>
                        )}
                    </header>


                    {/* Article Content */}
                    <div className="prose prose-lg prose-invert max-w-none">
                        <PortableText
                            value={article.content}
                            components={{
                                types: {
                                    image: ({ value }: any) => {
                                        if (!value?.asset) return null

                                        const imageUrl = value.asset.url || value.asset._ref
                                            ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref?.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
                                            : null

                                        if (!imageUrl) return null

                                        return (
                                            <div className="my-8">
                                                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={value.alt || 'Article image'}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 896px"
                                                    />
                                                </div>
                                                {value.caption && (
                                                    <p className="text-sm text-center text-muted-foreground mt-3 italic">
                                                        {value.caption}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    },
                                },
                                block: {
                                    normal: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>,
                                    h2: ({ children }) => <h2 className="font-display text-3xl font-bold text-foreground mt-12 mb-6">{children}</h2>,
                                    h3: ({ children }) => <h3 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">{children}</h3>,
                                    h4: ({ children }) => <h4 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">{children}</h4>,
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-orange-500 pl-6 my-6 italic text-muted-foreground">
                                            {children}
                                        </blockquote>
                                    ),
                                },
                                list: {
                                    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 text-muted-foreground my-6">{children}</ul>,
                                    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground my-6">{children}</ol>,
                                },
                                marks: {
                                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    link: ({ value, children }: any) => {
                                        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                                        return (
                                            <a
                                                href={value?.href}
                                                target={target}
                                                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                                                className="text-orange-500 hover:underline"
                                            >
                                                {children}
                                            </a>
                                        )
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Divider */}
                    <div className="my-16 border-t border-border" />

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                Artículos Relacionados
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedArticles.map((related: any) => (
                                    <Link
                                        key={related.slug.current}
                                        href={`/article/${related.slug.current}`}
                                        className="group block glass-card-hover overflow-hidden rounded-lg p-6"
                                    >
                                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-orange-500 transition-colors">
                                            {related.title}
                                        </h3>
                                        {related.excerpt && (
                                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        )}
                                        <p className="mt-4 text-xs text-muted-foreground">
                                            {new Date(related.publishedAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>

            <Footer />
        </main>
    )
}
