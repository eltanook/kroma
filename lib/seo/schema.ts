// JSON-LD Schema Generators for SEO
// https://developers.google.com/search/docs/appearance/structured-data

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kroma.com'
const SITE_NAME = 'KROMA'

// Organization Schema
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description: 'Cocina sin tóxicos. Productos libres de BPA y disruptores hormonales.',
        sameAs: [
            'https://instagram.com/kroma',
            'https://facebook.com/kroma',
        ],
    }
}

// Article Schema
interface ArticleSchemaProps {
    title: string
    description: string
    slug: string
    image?: string
    publishedAt: string
    modifiedAt?: string
    author?: string
    category: string
}

export function generateArticleSchema({
    title,
    description,
    slug,
    image = `${SITE_URL}/images/og-default.jpg`,
    publishedAt,
    modifiedAt,
    author = SITE_NAME,
    category,
}: ArticleSchemaProps) {
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: imageUrl,
        datePublished: publishedAt,
        dateModified: modifiedAt || publishedAt,
        author: {
            '@type': 'Organization',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/article/${slug}`,
        },
        articleSection: category,
    }
}

// Product Schema
interface ProductSchemaProps {
    name: string
    description: string
    slug: string
    image?: string
    price: number
    inStock: boolean
    category: string
}

export function generateProductSchema({
    name,
    description,
    slug,
    image = `${SITE_URL}/images/og-default.jpg`,
    price,
    inStock,
    category,
}: ProductSchemaProps) {
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: imageUrl,
        category,
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency: 'USD',
            availability: inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/shop/${slug}`,
        },
        brand: {
            '@type': 'Brand',
            name: SITE_NAME,
        },
    }
}

// Breadcrumb Schema
interface BreadcrumbItem {
    name: string
    url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    }
}

// Website Schema
export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Cocina sin tóxicos. Productos libres de BPA y disruptores hormonales.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

// Helper to inject JSON-LD into page
export function generateJSONLD(schema: object | object[]) {
    return {
        __html: JSON.stringify(Array.isArray(schema) ? schema : schema),
    }
}
