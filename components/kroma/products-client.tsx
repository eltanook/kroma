"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, Eye, Plus } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

const categories = ["Todos", "botellas", "contenedores", "utensilios", "accesorios"]

type Product = {
    name: string
    price: string
    image: string
    category: string
    slug: string
    badge: string
}

export function ProductsClient({ products }: { products: Product[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Todos")
    const [searchTerm, setSearchTerm] = useState("")

    // Filter logic
    let filteredProducts = selectedCategory === "Todos"
        ? products
        : products.filter((p) => p.category === selectedCategory)

    if (searchTerm) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                        Productos <span className="chrome-text">KROMA</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Materiales reales. Cero tóxicos. Para la cocina que cuida tu salud.
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filter Panel */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Search */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">
                                    Buscar
                                </label>
                                <div className="glass-card flex items-center gap-2 rounded-lg px-3 py-2">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Buscar productos..."
                                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-foreground">
                                    Categorías
                                </label>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors capitalize ${selectedCategory === category
                                                    ? "bg-orange-500 text-black"
                                                    : "glass-card text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Summary */}
                            <div className="glass-card rounded-lg p-4">
                                <p className="text-xs text-muted-foreground">
                                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product, index) => {
                                const addItem = useCartStore((state) => state.addItem)

                                const handleAddToCart = (e: React.MouseEvent) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addItem({
                                        id: product.slug,
                                        name: product.name,
                                        price: parseFloat(product.price.replace('$', '') || '0'),
                                        image: product.image,
                                        slug: product.slug,
                                    })
                                }

                                return (
                                    <div key={index} className="group relative block">
                                        <div className="glass-card-hover overflow-hidden rounded-lg">
                                            {/* Badge */}
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 z-10">
                                                    <span className="inline-block rounded-sm bg-orange-500/70 px-2 py-1 text-[9px] font-bold tracking-wider text-black/90 uppercase">
                                                        {product.badge}
                                                    </span>
                                                </div>

                                                {/* Image with Hover Overlay */}
                                                <div className="relative aspect-square overflow-hidden bg-zinc-900">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />

                                                    {/* Hover Actions */}
                                                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                                                        <button
                                                            onClick={handleAddToCart}
                                                            className="chrome-button flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                            Añadir
                                                        </button>
                                                        <Link
                                                            href={`/shop/${product.slug}`}
                                                            className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-orange-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/60 active:scale-95"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            Detalles
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="font-display text-lg font-semibold text-foreground">
                                                    {product.name}
                                                </h3>
                                                <p className="mt-2 font-display text-xl font-bold chrome-text">
                                                    {product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Si no hay productos */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    No se encontraron productos.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
