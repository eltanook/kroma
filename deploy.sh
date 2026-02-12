#!/bin/bash

# KROMA Deployment Script
# Este script automatiza el deployment completo

echo "🚀 KROMA Deployment Automation"
echo "================================"
echo ""

# Step 1: Deploy Sanity Studio
echo "📦 Step 1/3: Deploying Sanity Studio..."
echo "Ejecutando: npx sanity deploy"
echo ""
npx sanity deploy

if [ $? -ne 0 ]; then
    echo "❌ Error deploying Sanity Studio"
    exit 1
fi

echo "✅ Sanity Studio deployed!"
echo ""

# Step 2: Commit and Push to GitHub
echo "📤 Step 2/3: Pushing to GitHub..."
git add .
git commit -m "Deploy: Ready for production with SEO"
git push origin main

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Could not push to GitHub. Please push manually."
else
    echo "✅ Code pushed to GitHub!"
fi

echo ""

# Step 3: Instructions for Vercel
echo "🌐 Step 3/3: Deploy to Vercel"
echo "================================"
echo ""
echo "Ahora seguí estos pasos en Vercel:"
echo ""
echo "1. Ve a: https://vercel.com/new"
echo "2. Importa tu repo de GitHub"
echo "3. Agrega estas variables de entorno:"
echo ""
echo "   SANITY_API_TOKEN=<tu-token-aqui>"
echo "   NEXT_PUBLIC_SITE_URL=<tu-url-vercel>"
echo ""
echo "   (Las otras ya están pre-configuradas en vercel.json)"
echo ""
echo "4. Click 'Deploy'"
echo ""
echo "📋 Para crear el token de Sanity, revisá SANITY_TOKEN.md"
echo ""
echo "✨ ¡Deployment completo!"
