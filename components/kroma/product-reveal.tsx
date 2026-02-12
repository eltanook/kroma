"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, Plus } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

export function ProductReveal({ products }: { products: any[] }) {
  const addItem = useCartStore((state) => state.addItem)

  // Show only first 4 products on homepage
  const displayProducts = products.slice(0, 4)

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Featured
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Productos <span className="chrome-text-orange">KROMA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Materiales reales. Cero tóxicos. Para la cocina que cuida tu salud.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product, index) => {
            const handleAddToCart = (e: React.MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              addItem({
                id: product.slug.current,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || "/placeholder.svg",
                slug: product.slug.current,
              })
            }

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="glass-card-hover overflow-hidden rounded-lg">
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute left-3 top-3 z-10">
                      <span className="inline-block rounded-sm bg-orange-500/70 px-2 py-1 text-[9px] font-bold tracking-wider text-black/90 uppercase">
                        Destacado
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-900">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        onClick={handleAddToCart}
                        className="chrome-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                      >
                        <Plus className="h-3 w-3" />
                        Añadir
                      </button>
                      <Link
                        href={`/shop/${product.slug.current}`}
                        className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-orange-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/60 active:scale-95"
                      >
                        <Eye className="h-3 w-3" />
                        Detalles
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-display text-xl font-bold chrome-text">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/productos"
            className="chrome-button inline-block rounded-full px-8 py-3 text-sm font-semibold"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}
