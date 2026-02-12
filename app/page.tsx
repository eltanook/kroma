import { Navbar } from "@/components/kroma/navbar"
import { Hero } from "@/components/kroma/hero"
import { JournalHub } from "@/components/kroma/journal-hub"
import { ProductReveal } from "@/components/kroma/product-reveal"
import { AboutKroma } from "@/components/kroma/about-kroma"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { Counter } from "@/components/kroma/counter"
import { client } from "@/lib/sanity/client"
import { articlesQuery, featuredProductsQuery } from "@/lib/sanity/queries"
import { homeMetadata } from "@/lib/seo/metadata"
import { generateOrganizationSchema, generateWebsiteSchema, generateJSONLD } from "@/lib/seo/schema"

// Revalidar cada 60 segundos
export const revalidate = 60

// SEO Metadata
export const metadata = homeMetadata

export default async function Page() {
  // Fetch data on server
  const articles = await client.fetch(articlesQuery)
  const products = await client.fetch(featuredProductsQuery)

  // Generate JSON-LD schemas
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
  ]

  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(schemas)}
      />

      <CustomCursor />
      <Navbar />
      <Hero />

      {/* Stats Section - Below Hero with Counter Animation */}
      <section className="relative -mt-20 pb-12 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
              <div className="text-center">
                <p className="font-display text-3xl font-black chrome-text sm:text-4xl md:text-5xl">
                  <Counter end={5} suffix="M+" />
                </p>
                <p className="mt-3 sm:mt-4 text-xs font-medium text-muted-foreground">
                  Partículas de plástico
                  <br />
                  ingeridas por semana
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black chrome-text sm:text-4xl md:text-5xl">
                  <Counter end={93} suffix="%" />
                </p>
                <p className="mt-3 sm:mt-4 text-xs font-medium text-muted-foreground">
                  Personas con BPA
                  <br />
                  detectado en sangre
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-black chrome-text sm:text-4xl md:text-5xl">
                  <Counter end={0} suffix="%" />
                </p>
                <p className="mt-3 sm:mt-4 text-xs font-medium text-muted-foreground">
                  Tóxicos en todos los
                  <br />
                  productos KROMA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JournalHub articles={articles} />
      <ProductReveal products={products} />
      <AboutKroma />
      <Footer />
    </main>
  )
}
