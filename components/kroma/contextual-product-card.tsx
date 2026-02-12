"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ContextualProductCardProps {
    title: string
    description: string
    price: string
    image: string
    features?: string[]
}

export function ContextualProductCard({
    title,
    description,
    price,
    image,
    features = [],
}: ContextualProductCardProps) {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-widget sticky top-24 my-8 rounded-2xl p-6 shadow-2xl"
        >
            <div className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="inline-block rounded-sm bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-orange-500 uppercase">
                            Recomendado
                        </span>
                        <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                        <ul className="flex flex-col gap-1.5">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="h-1 w-1 rounded-full bg-orange-500" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Price & CTA */}
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
                        <div>
                            <p className="font-display text-2xl font-bold text-foreground">
                                {price}
                            </p>
                            <p className="text-xs text-muted-foreground">Envío gratis</p>
                        </div>
                        <button
                            type="button"
                            className="chrome-button rounded-full px-5 py-2 text-xs font-semibold"
                        >
                            Ver Producto
                        </button>
                    </div>
                </div>
            </div>
        </motion.aside>
    )
}
