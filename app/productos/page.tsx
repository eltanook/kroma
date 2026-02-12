import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { client } from "@/lib/sanity/client"
import { productsQuery } from "@/lib/sanity/queries"
import { ProductsClient } from "@/components/kroma/products-client"
import { productsMetadata } from "@/lib/seo/metadata"

// Revalidar cada 60 segundos
export const revalidate = 60

// SEO Metadata
export const metadata = productsMetadata

export default async function ProductosPage() {
    // Fetch productos desde Sanity
    const products = await client.fetch(productsQuery)

    // Transformar datos para el componente cliente
    const transformedProducts = products.map((product: any) => ({
        name: product.name,
        price: product.price ? `$${product.price}` : "Consultar",
        image: product.images?.[0] || "/placeholder.svg",
        category: product.category,
        slug: product.slug.current,
        badge: product.featured ? "DESTACADO" : product.inStock ? "DISPONIBLE" : "AGOTADO",
    }))

    return (
        <main>
            <CustomCursor />
            <Navbar />
            <ProductsClient products={transformedProducts} />
            <Footer />
        </main>
    )
}
