import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kroma.com'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/sanity/', '/studio/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
