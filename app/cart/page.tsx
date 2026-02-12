"use client"

import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { useCartStore } from "@/store/cart-store"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore()

    const handleWhatsAppCheckout = () => {
        const message = `Hola KROMA, quiero iniciar mi detox. Mi pedido:

${items.map(item => `• ${item.name} x${item.quantity}`).join('\n')}

Total estimado: €${totalPrice().toFixed(2)}

Quedo a la espera para coordinar envío y pago.`

        const encodedMessage = encodeURIComponent(message)
        const whatsappNumber = "5491234567890" // Reemplazar con número real
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
    }

    return (
        <>
            <CustomCursor />
            <Navbar />

            <main className="relative min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                            Inventario de Suministros
                        </p>
                        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Tu Pack <span className="chrome-text-orange">KROMA</span>
                        </h1>
                    </motion.div>

                    {items.length === 0 ? (
                        /* Empty Cart */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card rounded-2xl p-12 text-center"
                        >
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                                <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Tu inventario está vacío
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Comienza tu detox agregando productos al pack
                            </p>
                            <Link
                                href="/#productos"
                                className="chrome-button mt-6 inline-block rounded-full px-8 py-3 text-sm font-semibold"
                            >
                                Explorar Productos
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                            {/* Items List */}
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card-hover group rounded-lg p-4"
                                    >
                                        <div className="flex gap-4">
                                            {/* Image */}
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <h3 className="font-display text-base font-semibold text-foreground">
                                                        {item.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        €{item.price.toFixed(2)} / unidad
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="text-muted-foreground transition-colors hover:text-foreground"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="min-w-[2ch] text-center font-display text-sm font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="text-muted-foreground transition-colors hover:text-foreground"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-xs text-muted-foreground transition-colors hover:text-orange-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="flex flex-col items-end justify-between">
                                                <p className="font-display text-lg font-bold text-foreground">
                                                    €{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Summary Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card sticky top-24 h-fit rounded-2xl p-6"
                            >
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    Resumen del Pack
                                </h2>

                                <div className="mt-6 space-y-3 border-t border-border pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-display font-semibold text-foreground">
                                            €{totalPrice().toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Envío</span>
                                        <span className="font-display font-semibold text-orange-500">
                                            GRATIS
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between border-t border-border pt-4">
                                    <span className="font-display text-lg font-bold text-foreground">
                                        Total
                                    </span>
                                    <span className="font-display text-2xl font-bold text-foreground">
                                        €{totalPrice().toFixed(2)}
                                    </span>
                                </div>

                                {/* WhatsApp Checkout Button */}
                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="mt-6 w-full rounded-full bg-orange-500 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] active:scale-95"
                                >
                                    Solicitar Pack vía WhatsApp
                                </button>

                                <p className="mt-4 text-center text-xs text-muted-foreground">
                                    Te contactaremos para coordinar el envío y el pago
                                </p>

                                <button
                                    onClick={clearCart}
                                    className="mt-4 w-full text-xs text-muted-foreground transition-colors hover:text-orange-500"
                                >
                                    Vaciar carrito
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
