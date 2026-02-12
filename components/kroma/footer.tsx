"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"

const footerLinks = {
  Explorar: [
    { label: "Journal", href: "#journal" },
    { label: "Productos", href: "#productos" },
    { label: "Ciencia", href: "/article" },
    { label: "Manifiesto", href: "#manifiesto" },
  ],
  Recursos: [
    { label: "Guia Low-Tox", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Envios", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
  Legal: [
    { label: "Privacidad", href: "#" },
    { label: "Terminos", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer
      id="manifiesto"
      className="relative border-t border-border"
      role="contentinfo"
    >
      {/* Manifesto Section */}
      <div className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kroma-black to-kroma-carbon" aria-hidden="true" />
        <div className="noise-overlay absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl text-balance">
            El cambio empieza por{" "}
            <span className="chrome-text">lo que tocas</span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
            Cada dia, tu cuerpo absorbe cientos de particulas invisibles desde
            los objetos que usas. KROMA nacio para darte una alternativa: materiales
            reales, duraderos y libres de toxicos. No es una tendencia. Es una
            necesidad.
          </p>

          {/* Newsletter - Command Line Style */}
          <div className="mx-auto mt-8 sm:mt-10 max-w-md px-4 sm:px-0">
            {subscribed ? (
              <div className="glass-card rounded-lg px-6 py-4">
                <p className="text-sm text-foreground font-medium">
                  {">"} Bienvenido/a al movimiento KROMA.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Revisa tu correo para la primera dosis de verdad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="group">
                <div className="glass-card flex items-center gap-3 rounded-lg px-4 py-3 transition-all focus-within:border-zinc-500/30">
                  <span className="text-sm text-muted-foreground font-mono select-none" aria-hidden="true">
                    {">"}
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-mono"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="chrome-button rounded-md px-4 py-1.5 text-xs font-semibold tracking-wider"
                  >
                    ENTER
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground/60">
                  Recibe inteligencia sobre salud y materiales. Sin spam. Sin plasticos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand Column */}
            <div>
              <Link href="/" className="font-display text-xl font-bold chrome-text">
                KROMA
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Biohacking del hogar. Materiales puros para una vida sin toxicos.
              </p>
            </div>

            {/* Explorar Column */}
            <div>
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                Explorar
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="transition-colors hover:text-foreground">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/ciencia" className="transition-colors hover:text-foreground">
                    Ciencia
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="transition-colors hover:text-foreground">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto Column */}
            <div>
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                Contacto
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:hola@kroma.com" className="transition-colors hover:text-foreground">
                    hola@kroma.com
                  </a>
                </li>
                <li>
                  <a href="tel:+5491112345678" className="transition-colors hover:text-foreground">
                    +54 9 11 1234-5678
                  </a>
                </li>
                <li className="pt-2">
                  <p className="text-xs">
                    Buenos Aires, Argentina
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-xs text-muted-foreground/60">
              {"KROMA 2026. Todos los derechos reservados."}
            </p>
            <p className="text-xs text-muted-foreground/40">
              Designed by{" "}
              <span className="text-muted-foreground/60 font-medium">Zevetix</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
