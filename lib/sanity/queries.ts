import { groq } from 'next-sanity'

// ==================== ARTICLES ====================

// Obtener todos los artículos
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    category,
    publishedAt,
    author
  }
`

// Obtener artículo por slug
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    category,
    excerpt,
    publishedAt,
    author
  }
`

// Obtener artículos por categoría
export const articlesByCategoryQuery = groq`
  *[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    category,
    publishedAt,
    author
  }
`

// Obtener artículos recientes (límite)
export const recentArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url,
    category,
    publishedAt,
    author
  }
`

// ==================== PRODUCTS ====================

// Obtener todos los productos
export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "images": images[].asset->url,
    "imagesAlt": images[].alt,
    price,
    description,
    features,
    category,
    inStock,
    featured
  }
`

// Obtener producto por slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "images": images[].asset->url,
    "imagesAlt": images[].alt,
    price,
    description,
    features,
    category,
    inStock,
    featured
  }
`

// Obtener productos destacados
export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true && inStock == true] {
    _id,
    name,
    slug,
    "images": images[].asset->url,
    "imagesAlt": images[].alt,
    price,
    description,
    category,
    inStock
  }
`

// Obtener productos por categoría
export const productsByCategoryQuery = groq`
  *[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "images": images[].asset->url,
    price,
    description,
    category,
    inStock,
    featured
  }
`
