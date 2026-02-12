import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { client } from "@/lib/sanity/client"
import { articlesQuery } from "@/lib/sanity/queries"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { cienciaMetadata } from "@/lib/seo/metadata"

// Revalidar cada 60 segundos
export const revalidate = 60

// SEO Metadata
export const metadata = cienciaMetadata

export default async function CienciaPage() {
    // Fetch artículos desde Sanity
    const allArticles = await client.fetch(articlesQuery)

    // Filtrar solo artículos de ciencia
    const cienciaArticles = allArticles.filter(
        (article: any) => article.category === "ciencia"
    )

    return (
        <main>
            <CustomCursor />
            <Navbar />

            <div className="min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                            Ciencia <span className="chrome-text">KROMA</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                            Investigación científica sobre materiales y salud.
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {cienciaArticles.map((article: any) => (
                            <Link
                                key={article._id}
                                href={`/ article / ${article.slug.current} `}
                                className="group block glass-card-hover overflow-hidden rounded-lg"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    {article.mainImage ? (
                                        <Image
                                            src={article.mainImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-orange-500/20 to-zinc-800" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                                    {/* Tag */}
                                    <div className="absolute left-4 top-4">
                                        <span className="inline-block rounded-sm bg-orange-500/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-orange-500/70 backdrop-blur-md uppercase">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
                                        {article.title}
                                    </h3>

                                    {article.excerpt && (
                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Si no hay artículos */}
                    {cienciaArticles.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                Aún no hay artículos de ciencia publicados.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
