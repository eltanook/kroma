"use client"

import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

export function ProductDetailClient({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        addItem({
            id: product.slug.current,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || "/placeholder.svg",
            slug: product.slug.current,
        })
    }

    return (
        <div className="mt-10">
            <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="chrome-button flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? "Agregar al Carrito" : "Agotado"}
            </button>
        </div>
    )
}
