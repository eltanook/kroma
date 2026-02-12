import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kroma.com"),
  title: {
    default: "KROMA | Productos Sin Plástico para una Cocina Saludable",
    template: "%s | KROMA"
  },
  description: "Elimina los microplásticos y químicos tóxicos de tu cocina. Productos de acero inoxidable 304, vidrio borosilicato y bambú orgánico respaldados por ciencia. Cero BPA, cero ftalatos, cero disruptores hormonales.",
  keywords: [
    "productos sin plástico",
    "utensilios sin BPA",
    "cocina saludable",
    "acero inoxidable 304",
    "eliminar microplásticos",
    "cocina sin tóxicos",
    "vidrio borosilicato",
    "bambú orgánico",
    "disruptores hormonales",
    "productos ecológicos cocina"
  ],
  authors: [{ name: "KROMA" }],
  creator: "KROMA",
  publisher: "KROMA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://kroma.com",
    siteName: "KROMA",
    title: "KROMA | Productos Sin Plástico para una Cocina Saludable",
    description: "Elimina los microplásticos y químicos tóxicos de tu cocina con productos de acero, vidrio y bambú orgánico.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KROMA - Productos Sin Plástico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kroma",
    creator: "@kroma",
    title: "KROMA | Productos Sin Plástico para una Cocina Saludable",
    description: "Elimina los microplásticos de tu cocina con acero inoxidable 304, vidrio borosilicato y bambú orgánico.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://kroma.com",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KROMA",
  description: "Productos sin plástico para una cocina libre de tóxicos",
  url: "https://kroma.com",
  logo: "https://kroma.com/logo.png",
  sameAs: [
    "https://instagram.com/kroma",
    "https://facebook.com/kroma"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-9-11-1234-5678",
    contactType: "customer service",
    areaServed: "AR",
    availableLanguage: ["Spanish"],
    email: "hola@kroma.com"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
