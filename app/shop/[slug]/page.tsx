import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { client } from "@/lib/sanity/client"
import { productsQuery } from "@/lib/sanity/queries"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Check } from "lucide-react"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "@/components/kroma/product-detail-client"
import { generateSEOMetadata } from "@/lib/seo/metadata"
import { generateProductSchema, generateBreadcrumbSchema, generateJSONLD } from "@/lib/seo/schema"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

// Revalidar cada 60 segundos
export const revalidate = 60

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]{ name, description, images, price }`,
        { slug }
    )

    if (!product) return {}

    return generateSEOMetadata({
        title: product.name,
        description: product.description || product.name,
        path: `/shop/${slug}`,
        image: product.images?.[0],
        type: 'website',
        keywords: ['sin BPA', 'sin tóxicos', product.name, 'KROMA'],
    })
}

// Generate static params
export async function generateStaticParams() {
    const products = await client.fetch(productsQuery)
    return products.map((product: any) => ({
        slug: product.slug.current,
    }))
}

export default async function ProductPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]{
            _id,
            name,
            slug,
            category,
            price,
            description,
            features,
            inStock,
            featured,
            images
        }`,
        { slug }
    )

    if (!product) {
        notFound()
    }

    // Fetch productos relacionados
    const relatedProducts = await client.fetch(
        `*[_type == "product" && category == $category && slug.current != $slug][0...4]{
            name,
            slug,
            price,
            images,
            inStock,
            featured
        }`,
        { category: product.category, slug }
    )

    // Generate JSON-LD schemas
    const productSchema = generateProductSchema({
        name: product.name,
        description: product.description || product.name,
        slug,
        image: product.images?.[0],
        price: product.price,
        inStock: product.inStock,
        category: product.category,
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Productos', url: '/productos' },
        { name: product.category, url: '/productos' },
        { name: product.name, url: `/shop/${slug}` },
    ])

    return (
        <main>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD([productSchema, breadcrumbSchema])}
            />

            <CustomCursor />
            <Navbar />

            <div className="min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[
                        { name: 'Productos', url: '/productos' },
                        { name: product.category, url: '/productos' },
                        { name: product.name, url: `/shop/${slug}` },
                    ]} />

                    {/* Back Link */}
                    <Link
                        href="/productos"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver a productos
                    </Link>

                    {/* Product Details */}
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Images */}
                        <div className="relative aspect-square overflow-hidden rounded-2xl glass-card">
                            <Image
                                src={product.images?.[0] || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {product.featured && (
                                <div className="absolute top-4 left-4">
                                    <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold tracking-wider text-black uppercase">
                                        Destacado
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div>
                            {/* Category */}
                            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4">
                                {product.category}
                            </p>

                            {/* Title */}
                            <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="mt-6">
                                <p className="font-display text-3xl font-bold chrome-text">
                                    ${product.price}
                                </p>
                                {product.inStock ? (
                                    <p className="mt-2 flex items-center gap-2 text-sm text-green-500">
                                        <Check className="h-4 w-4" />
                                        En stock
                                    </p>
                                ) : (
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Agotado
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                {product.description}
                            </p>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                                        Características
                                    </h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Add to Cart */}
                            <ProductDetailClient product={product} />
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-24">
                            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                                Productos Relacionados
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {relatedProducts.map((related: any) => (
                                    <Link
                                        key={related.slug.current}
                                        href={`/shop/${related.slug.current}`}
                                        className="group block glass-card-hover overflow-hidden rounded-lg"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-zinc-900">
                                            <Image
                                                src={related.images?.[0] || "/placeholder.svg"}
                                                alt={related.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-display text-lg font-semibold text-foreground">
                                                {related.name}
                                            </h3>
                                            <p className="mt-2 font-display text-xl font-bold chrome-text">
                                                ${related.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
