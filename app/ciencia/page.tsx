import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { WhatsAppButton } from "@/components/kroma/whatsapp-button"
import { client } from "@/lib/sanity/client"
import { articlesQuery } from "@/lib/sanity/queries"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Beaker, Shield, Leaf, AlertTriangle } from "lucide-react"
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
            <WhatsAppButton />
            <Navbar />

            {/* Hero Section - Simple como blog/productos */}
            <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-xl">
                                <Beaker className="h-4 w-4 text-orange-500" />
                                <span className="text-xs font-medium tracking-widest text-orange-500 uppercase">
                                    Investigación Científica
                                </span>
                            </span>
                        </div>
                        <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            La <span className="chrome-text">Ciencia</span> Detrás
                        </h1>
                        <p className="mt-6 text-base text-muted-foreground sm:text-lg leading-relaxed">
                            Investigación peer-reviewed que respalda por qué los materiales naturales son esenciales para tu salud hormonal y bienestar.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Research Areas */}
            <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-background/50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Card 1: Disruptores Endocrinos */}
                        <div className="glass-card-hover rounded-xl p-6 group">
                            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <AlertTriangle className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                                Disruptores Endocrinos
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                BPA, ftalatos y otros químicos en plásticos alteran tu sistema hormonal, afectando fertilidad, metabolismo y salud mental.
                            </p>
                        </div>

                        {/* Card 2: Microplásticos */}
                        <div className="glass-card-hover rounded-xl p-6 group">
                            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                                Microplásticos
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                5 gramos semanales: equivalente a una tarjeta de crédito. Se acumulan en órganos vitales y cruzan la barrera hematoencefálica.
                            </p>
                        </div>

                        {/* Card 3: Acero Inoxidable */}
                        <div className="glass-card-hover rounded-xl p-6 group">
                            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Beaker className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                                Acero Inoxidable 304
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                Material inerte, no reactivo. Certificado por FDA y estudios demuestran cero migración química incluso con alimentos ácidos o calientes.
                            </p>
                        </div>

                        {/* Card 4: Sostenibilidad */}
                        <div className="glass-card-hover rounded-xl p-6 group">
                            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Leaf className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                                Impacto Ambiental
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                8 millones de toneladas de plástico al océano anualmente. Materiales duraderos reducen residuos en un 95% vs. desechables.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12 sm:py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                            Artículos de <span className="chrome-text">Investigación</span>
                        </h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                            Análisis profundos basados en estudios científicos peer-reviewed.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {cienciaArticles.map((article: any) => (
                            <Link
                                key={article._id}
                                href={`/article/${article.slug.current}`}
                                className="group block glass-card-hover overflow-hidden rounded-xl"
                            >
                                {/* Image */}
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    {article.mainImage ? (
                                        <Image
                                            src={article.mainImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-orange-500/20 via-zinc-800 to-zinc-900" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

                                    {/* Tag */}
                                    <div className="absolute left-4 top-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-orange-500 backdrop-blur-xl uppercase">
                                            <Beaker className="h-3 w-3" />
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 sm:p-6">
                                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>

                                    <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground group-hover:text-orange-500 transition-colors">
                                        {article.title}
                                    </h3>

                                    {article.excerpt && (
                                        <p className="mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Si no hay artículos */}
                    {cienciaArticles.length === 0 && (
                        <div className="text-center py-12 sm:py-16 glass-card rounded-2xl">
                            <Beaker className="h-10 sm:h-12 w-10 sm:w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-base sm:text-lg text-muted-foreground mb-2">
                                Próximamente: Artículos científicos
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-md mx-auto px-4">
                                Estamos preparando contenido basado en investigación peer-reviewed.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
