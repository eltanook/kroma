"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, ShoppingBag, X, Menu } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const totalItems = useCartStore((state) => state.totalItems())
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/blog", label: "Blog" },
    { href: "/productos", label: "Productos" },
    { href: "/ciencia", label: "Ciencia" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'glass-card backdrop-blur-xl bg-background/80'
            : 'bg-transparent'
          }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50" aria-label="KROMA Inicio">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight chrome-text">
              KROMA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-6 lg:gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors ${pathname === link.href
                    ? 'text-foreground active'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart & Theme */}
            <div className="flex items-center gap-2">
              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-zinc-500/50 hover:text-foreground"
                aria-label="Carrito de compras"
              >
                <ShoppingBag className="h-4 w-4" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-black">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-zinc-500/50 hover:text-foreground"
                aria-label="Cambiar tema"
              >
                {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
              </button>
            </div>
          </div>

          {/* Mobile: Cart, Theme, and Menu */}
          <div className="flex items-center gap-2 lg:hidden z-50">
            {/* Cart Icon - Mobile */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-zinc-500/50 hover:text-foreground"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="h-4 w-4" />
              {mounted && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Theme Toggle - Mobile */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-zinc-500/50 hover:text-foreground"
              aria-label="Cambiar tema"
            >
              {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-zinc-500/50 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm glass-card border-l border-border z-40 lg:hidden overflow-y-auto">
            <div className="flex flex-col h-full pt-20 px-6 pb-6">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-4 rounded-lg text-base font-medium transition-colors ${pathname === link.href
                        ? 'bg-orange-500/10 text-orange-500'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA at Bottom */}
              <div className="mt-auto pt-6 border-t border-border">
                <Link
                  href="#manifiesto"
                  className="chrome-button block w-full rounded-full px-6 py-4 text-center text-sm font-bold tracking-wide"
                >
                  Unirse al Movimiento
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
