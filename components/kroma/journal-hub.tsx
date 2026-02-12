"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = ["Todo", "ciencia", "salud", "sostenibilidad"]

function ArticleCard({
  article,
  featured = false,
}: {
  article: any
  featured?: boolean
}) {
  return (
    <Link href={`/article/${article.slug.current}`} className={`group block ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`metallic-shine glass-card-hover relative flex h-full flex-col overflow-hidden rounded-lg ${featured ? "min-h-[500px]" : "min-h-[280px]"}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-40"}`}>
          <Image
            src={article.mainImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kroma-black via-kroma-black/50 to-transparent" />

          {/* Tag */}
          <div className="absolute left-4 top-4 z-10">
            <span className="inline-block rounded-sm bg-orange-500/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-orange-500/70 backdrop-blur-md uppercase">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3
              className={`font-display font-semibold leading-tight tracking-tight text-foreground ${featured ? "text-xl md:text-2xl" : "text-base"}`}
            >
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Leer{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
                {"->"}
              </span>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export function JournalHub({ articles, showAll = false }: { articles: any[], showAll?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("Todo")

  const filtered =
    activeCategory === "Todo"
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  // Show only first 3 on homepage, all on blog page
  const displayArticles = showAll ? filtered : filtered.slice(0, 3)

  return (
    <section id="journal" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              Investigación
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Blog <span className="chrome-text-orange">KROMA</span>
            </h2>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all capitalize ${activeCategory === cat
                    ? "chrome-button"
                    : "border border-border text-muted-foreground hover:border-zinc-500/50 hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {displayArticles.map((article, i) => (
            <ArticleCard key={article._id} article={article} featured={i === 0 && !showAll} />
          ))}
        </div>

        {/* CTA to View All (only on homepage) */}
        {!showAll && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="chrome-button inline-block rounded-full px-8 py-3 text-sm font-semibold"
            >
              Ver Todos los Artículos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
