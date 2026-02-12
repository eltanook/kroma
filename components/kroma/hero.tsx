"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Background Image - Fixed Attachment */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/images/hero.jpg)',
          }}
        />

        {/* Gradient Overlay - starts from midpoint down */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-background/60 via-50% to-background to-100%" />

        {/* Noise texture overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 mx-auto max-w-6xl px-6 pb-40 text-center transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        {/* Tag */}
        <div className="mt-24 mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-orange-500"></span>
          <span className="text-xs font-medium tracking-widest text-orange-500 uppercase">
            Alerta Crítica
          </span>
        </div>

        {/* Headline with metal shine effect */}
        <h1
          id="hero-heading"
          className="font-display text-4xl font-black leading-[0.9] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] text-balance"
        >
          <span className="block text-foreground">DEJA DE COMER</span>
          <span className="block chrome-text-orange metal-shine mt-2">PLÁSTICO</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-4">
          <span className="text-orange-500 font-semibold">5 gramos/semana</span> de microplásticos en tu cuerpo.
          {" "}Recupera tu salud hormonal. <span className="text-foreground font-semibold">Pásate al acero.</span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center px-4 sm:px-0">
          <Link
            href="/blog"
            className="chrome-button rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-transform hover:scale-105 active:scale-95 text-center"
          >
            Explorar la Ciencia
          </Link>
          <Link
            href="/productos"
            className="group flex items-center justify-center gap-2 rounded-full border-2 border-orange-500/30 bg-orange-500/5 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-xl transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:scale-105 active:scale-95"
          >
            Ver Productos
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
