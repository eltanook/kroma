"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

const categories = ["TODOS", "SALUD", "CIENCIA", "SOSTENIBILIDAD"]

type Article = {
    title: string
    excerpt: string
    image: string
    tag: string
    category: string
    date: string
    readTime: string
    slug: string
}

type BlogClientProps = {
    articles: Article[]
    featuredArticle: Article
}

export function BlogClient({ articles, featuredArticle }: BlogClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("TODOS")
    const [currentPage, setCurrentPage] = useState(1)
    const articlesPerPage = 9

    const filteredArticles =
        selectedCategory === "TODOS"
            ? articles.slice(1) // Skip featured
            : articles.filter((article) => article.tag === selectedCategory)

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
    const startIndex = (currentPage - 1) * articlesPerPage
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-6">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                        Blog <span className="chrome-text">KROMA</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Ciencia, salud y verdad sobre los materiales que usas cada día.
                    </p>
                </div>

                {/* Featured Article */}
                {featuredArticle && (
                    <Link
                        href={`/article/${featuredArticle.slug}`}
                        className="group mb-16 block overflow-hidden rounded-2xl glass-card-hover"
                    >
                        <div className="grid md:grid-cols-2">
                            {/* Image */}
                            <div className="relative h-64 md:h-96">
                                <Image
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent md:from-transparent md:to-background/60" />

                                {/* Tag */}
                                <div className="absolute left-6 top-6">
                                    <span className="inline-block rounded-sm bg-orange-500/20 px-3 py-1.5 text-xs font-semibold tracking-wider text-orange-500/70 backdrop-blur-md uppercase">
                                        {featuredArticle.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center p-8 md:p-12">
                                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        {featuredArticle.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        {featuredArticle.readTime}
                                    </div>
                                </div>

                                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                                    {featuredArticle.title}
                                </h2>

                                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                    {featuredArticle.excerpt}
                                </p>

                                <div className="mt-6">
                                    <span className="text-sm font-semibold text-orange-500 group-hover:underline">
                                        Leer artículo completo →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category)
                                setCurrentPage(1)
                            }}
                            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === category
                                    ? "bg-orange-500 text-black"
                                    : "glass-card text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedArticles.map((article, index) => (
                        <Link
                            key={index}
                            href={`/article/${article.slug}`}
                            className="group block glass-card-hover overflow-hidden rounded-lg"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                                {/* Tag */}
                                <div className="absolute left-4 top-4">
                                    <span className="inline-block rounded-sm bg-orange-500/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-orange-500/70 backdrop-blur-md uppercase">
                                        {article.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>{article.date}</span>
                                    <span>·</span>
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
                                    {article.title}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                    {article.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg glass-card px-4 py-2 text-sm font-medium disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium ${currentPage === page
                                        ? "bg-orange-500 text-black"
                                        : "glass-card text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg glass-card px-4 py-2 text-sm font-medium disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
