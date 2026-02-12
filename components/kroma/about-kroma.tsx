"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export function AboutKroma() {
    const [sliderPosition, setSliderPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const updateSliderPosition = (clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        setSliderPosition(percentage)
    }

    return (
        <section className="relative py-24 border-t border-border">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Text Column */}
                    <div className="space-y-8">
                        <div>
                            <div className="mb-4">
                                <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
                                    La Ciencia Detrás
                                </span>
                            </div>
                            <h2 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                                Materiales{" "}
                                <span className="chrome-text">Reales</span>
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                No es una tendencia. Es una{" "}
                                <span className="font-semibold text-foreground">necesidad biológica</span>.
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                Los plásticos liberan micropartículas y químicos disruptores hormonales
                                que tu cuerpo absorbe diariamente. Acero inoxidable, vidrio borosilicato
                                y bambú no solo son duraderos: son inertes y seguros.
                            </p>
                        </div>

                        {/* Key Benefits */}
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">Cero Migración Química</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Materiales inertes que no liberan toxinas</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">Durabilidad Extrema</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Diseñados para durar décadas, no meses</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">Respaldo Científico</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Cada material validado por estudios peer-reviewed</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div>
                            <Link
                                href="/ciencia"
                                className="chrome-button rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-transform hover:scale-105 active:scale-95 inline-block"
                            >
                                Explorar la Ciencia
                            </Link>
                        </div>
                    </div>

                    {/* Before/After Slider - Real-time */}
                    <div
                        ref={containerRef}
                        className="relative h-96 overflow-hidden rounded-2xl lg:h-[500px] group select-none"
                        onMouseMove={(e) => {
                            if (e.buttons === 1) {
                                updateSliderPosition(e.clientX)
                            }
                        }}
                        onTouchMove={(e) => {
                            if (e.touches.length > 0) {
                                updateSliderPosition(e.touches[0].clientX)
                            }
                        }}
                    >
                        {/* Before Image (left side) */}
                        <div className="absolute inset-0">
                            <Image
                                src="/placeholder.svg"
                                alt="Cocina con plásticos"
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-zinc-900/20" />
                            <div className="absolute bottom-6 left-6 glass-card rounded-lg px-4 py-2 pointer-events-none">
                                <span className="text-xs font-bold text-zinc-400">CON PLÁSTICOS</span>
                            </div>
                        </div>

                        {/* After Image (right side) - Clipped by slider */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                        >
                            <Image
                                src="/placeholder.svg"
                                alt="Cocina sin plásticos"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-orange-500/10" />
                            <div className="absolute bottom-6 right-6 glass-card rounded-lg px-4 py-2">
                                <span className="text-xs font-bold text-orange-400">SIN PLÁSTICOS</span>
                            </div>
                        </div>

                        {/* Slider Handle - Real-time tracking */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 group-hover:w-2 transition-width"
                            style={{ left: `${sliderPosition}%` }}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                updateSliderPosition(e.clientX)
                            }}
                            onTouchStart={(e) => {
                                if (e.touches.length > 0) {
                                    updateSliderPosition(e.touches[0].clientX)
                                }
                            }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none">
                                <svg className="h-6 w-6 text-black rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>

                        {/* Instruction hint */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-xs font-medium text-foreground">← Arrastra →</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
