# 🚀 KROMA - Quick Deploy

Deploy KROMA en 3 pasos simples.

---

## ⚡ Deploy Rápido (Ya tenés el código en GitHub)

### 1️⃣ Deploy Sanity Studio

```bash
npx sanity deploy
```

Elegí un hostname (ej: `kroma-studio`) → Tu studio estará en `https://kroma-studio.sanity.studio`

### 2️⃣ Deploy Next.js en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Selecciona tu repo de KROMA
4. Vercel detectará Next.js automáticamente

### 3️⃣ Configurar Variables de Entorno en Vercel

Vercel te pedirá estas variables (ya están pre-configuradas en `vercel.json`):

```env
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tu-dominio-vercel.vercel.app
```

**¿Dónde consigo el token?**
1. Ve a [sanity.io/manage](https://sanity.io/manage)
2. Selecciona tu proyecto
3. API → Tokens → **Create New Token**
4. Permisos: `Editor`

### ✅ ¡Deploy!

Click **"Deploy"** y espera 2-3 minutos.

Tu sitio estará en: `https://kroma-[random].vercel.app`

---

## 🔄 Updates Automáticos

### Contenido (Sanity)
- Edita en `https://tu-studio.sanity.studio`
- Cambios aparecen automáticamente en 60 segundos
- ❌ NO necesitas re-deployear

### Código (GitHub)
- `git push origin main`
- Vercel auto-deploya en 2-3 minutos
- ✅ Deploy automático

---

## 📋 Checklist Post-Deploy

- [ ] Visita tu sitio en producción
- [ ] Verifica `/sitemap.xml`
- [ ] Verifica `/robots.txt`
- [ ] Prueba crear un producto en Sanity Studio
- [ ] Verifica que aparezca en la web
- [ ] Envía sitemap a [Google Search Console](https://search.google.com/search-console)

---

## 🐛 Problemas?

**Contenido no aparece:**
- Verifica que `SANITY_API_TOKEN` tenga permisos `Editor`
- Check logs en Vercel Dashboard

**Imágenes no cargan:**
- Vercel auto-configura `cdn.sanity.io` en Next.js 15+
- Si hay problemas, agrega a `next.config.ts`: `remotePatterns: [{ hostname: 'cdn.sanity.io' }]`

---

## 📊 SEO Post-Deploy

1. **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
   - Agrega tu dominio
   - Envía sitemap: `https://tu-dominio.com/sitemap.xml`

2. **Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Testea URLs de productos y artículos

3. **Open Graph Debuggers**:
   - Facebook: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
   - Twitter: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

---

## 🎯 Hecho!

KROMA está live con:
- ✅ SEO completo (sitemap, metadata, JSON-LD)
- ✅ Deploy automático desde GitHub
- ✅ CMS con Sanity Studio
- ✅ ISR (contenido se actualiza cada 60s)

**Tu Stack:**
- **Frontend**: Next.js 16 + Vercel
- **CMS**: Sanity.io
- **Analytics**: Vercel Analytics (habilitalo en dashboard)
