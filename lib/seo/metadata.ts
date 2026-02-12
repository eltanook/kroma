import type { Metadata } from 'next'

const SITE_NAME = 'KROMA'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kroma.com'
const SITE_DESCRIPTION = 'Cocina sin tóxicos con productos de acero inoxidable 304, vidrio borosilicato y bambú natural. 100% libres de BPA, ftalatos y disruptores hormonales. Recuperá tu salud hormonal con materiales certificados FDA y respaldados por ciencia.'

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
    const imageUrl = image && image.startsWith('http') ? image : `${SITE_URL}${image || '/images/og-default.jpg'}`

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
    title: 'KROMA | Cocina Sin Tóxicos, Productos Libres de BPA',
    description: SITE_DESCRIPTION,
    path: '/',
    keywords: [
        'cocina sin tóxicos',
        'productos sin BPA',
        'botellas acero inoxidable 304',
        'contenedores vidrio borosilicato',
        'libre de ftalatos',
        'sin disruptores hormonales',
        'utensilios bambú natural',
        'salud hormonal',
        'microplásticos prevención',
        'cocina saludable Argentina',
        'productos eco friendly',
        'materiales inertes certificados FDA'
    ],
})

export const blogMetadata = generateSEOMetadata({
    title: 'Blog KROMA | Artículos sobre BPA, Microplásticos y Salud',
    description: 'Artículos basados en ciencia sobre BPA, disruptores endocrinos, microplásticos en alimentos y cómo eliminar tóxicos de tu cocina. Guías prácticas para una vida sin plásticos.',
    path: '/blog',
    keywords: [
        'blog salud hormonal',
        'artículos BPA efectos',
        'disruptores hormonales qué son',
        'microplásticos en comida',
        'cómo eliminar plásticos cocina',
        'vida sin tóxicos',
        'ftalatos en alimentos',
        'acero vs plástico salud',
        'guía cocina saludable'
    ],
})

export const productsMetadata = generateSEOMetadata({
    title: 'Productos Sin BPA | Botellas Acero Inoxidable y Contenedores Vidrio',
    description: 'Botellas de acero inoxidable 304, contenedores de vidrio borosilicato y utensilios de bambú orgánico. 100% libres de BPA, ftalatos y disruptores hormonales. Certificados FDA. Envíos a todo Argentina.',
    path: '/productos',
    keywords: [
        'botellas acero inoxidable Argentina',
        'contenedores vidrio borosilicato',
        'utensilios bambú orgánico',
        'productos sin BPA comprar',
        'libre de ftalatos',
        'acero inoxidable 304 food grade',
        'cocina sin plástico',
        'loncheras vidrio',
        'termos acero',
        'productos eco friendly Argentina'
    ],
})

export const cienciaMetadata = generateSEOMetadata({
    title: 'Ciencia y Estudios sobre Plásticos, BPA y Disruptores Hormonales',
    description: 'Investigaciones científicas peer-reviewed sobre el impacto de los plásticos, BPA, ftalatos y microplásticos en tu salud hormonal. Descubrí la ciencia detrás de los materiales naturales como el acero inoxidable 304 y vidrio borosilicato.',
    path: '/ciencia',
    keywords: [
        'estudios científicos BPA',
        'investigación microplásticos',
        'disruptores endocrinos estudios',
        'ftalatos salud hormonal',
        'acero inoxidable 304 certificación FDA',
        'vidrio borosilicato propiedades',
        'impacto ambiental plásticos',
        'salud hormonal materiales',
        'peer reviewed toxicología',
        'materiales inertes cocina'
    ],
})

