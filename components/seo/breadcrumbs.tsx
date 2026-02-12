"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [{ name: "Inicio", url: "/" }, ...items]

    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1

                    return (
                        <li key={item.url} className="flex items-center gap-2">
                            {index === 0 && <Home className="h-3.5 w-3.5 text-muted-foreground" />}

                            {isLast ? (
                                <span className="font-medium text-foreground">{item.name}</span>
                            ) : (
                                <>
                                    <Link
                                        href={item.url}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                </>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
