import type { Metadata } from 'next'

const SITE_NAME = 'KROMA'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kroma.com'
const SITE_DESCRIPTION = 'Cocina sin tóxicos. Productos de acero inoxidable, vidrio y bambú libres de BPA y disruptores hormonales para una vida más saludable.'

interface SEOMetadataProps {
    title: string
    description: string
    path?: string
    image?: string
    type?: 'website' | 'article' | 'product'
    publishedTime?: string
    modifiedTime?: string
    keywords?: string[]
    noindex?: boolean
}

export function generateSEOMetadata({
    title,
    description,
    path = '',
    image = '/images/og-default.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
    keywords = [],
    noindex = false,
}: SEOMetadataProps): Metadata {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    const url = `${SITE_URL}${path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    const metadata: Metadata = {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
        authors: [{ name: SITE_NAME }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: url,
        },
        openGraph: {
            siteName: SITE_NAME,
            title: fullTitle,
            description,
            url,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 1061206,
                    alt: title,
                },
            ],
            locale: 'es_AR',
            ...(type === 'article' && publishedTime ? {
                type: 'article' as const,
                publishedTime,
                modifiedTime,
            } : {
                type: type as 'website',
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [imageUrl],
            creator: '@kroma',
        },
    }

    if (noindex) {
        metadata.robots = {
            index: false,
            follow: false,
        }
    }

    return metadata
}

// Quick helpers for common pages
export const homeMetadata = generateSEOMetadata({
    title: 'KROMA',
    description: SITE_DESCRIPTION,
    path: '/',
    keywords: ['cocina sin tóxicos', 'productos sin BPA', 'acero inoxidable', 'vida saludable'],
})

export const blogMetadata = generateSEOMetadata({
    title: 'Blog',
    description: 'Artículos sobre BPA, disruptores hormonales, microplásticos y cómo eliminar tóxicos de tu cocina. Ciencia respaldada para una vida más saludable.',
    path: '/blog',
    keywords: ['blog salud', 'BPA', 'disruptores hormonales', 'microplásticos'],
})

export const productsMetadata = generateSEOMetadata({
    title: 'Productos',
    description: 'Botellas de acero inoxidable, contenedores de vidrio borosilicato y utensilios de bambú. 100% libres de tóxicos y BPA.',
    path: '/productos',
    keywords: ['productos sin BPA', 'botellas acero inoxidable', 'contenedores vidrio', 'utensilios bambú'],
})

export const cienciaMetadata = generateSEOMetadata({
    title: 'Ciencia',
    description: 'Investigaciones científicas sobre el impacto de los plásticos, BPA y disruptores hormonales en tu salud.',
    path: '/ciencia',
    keywords: ['ciencia materiales', 'investigación BPA', 'estudios microplásticos'],
})
