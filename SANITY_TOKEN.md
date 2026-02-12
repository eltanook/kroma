# Create Sanity API Token

Para que Vercel pueda leer contenido de Sanity, necesitás un token de API.

## Pasos:

1. Ve a https://sanity.io/manage
2. Selecciona tu proyecto (KROMA)
3. Click en **API** en el menú lateral
4. Click en **Tokens**
5. Click **Add API Token**
6. Configuración:
   - **Name**: `Vercel Production`
   - **Permissions**: `Editor`
7. Click **Add Token**
8. **COPIA EL TOKEN** (solo se muestra una vez!)

## Usar el Token en Vercel:

1. En Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Agrega:
   - **Key**: `SANITY_API_TOKEN`
   - **Value**: [el token que copiaste]
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
3. Save

## Variables de Entorno Completas para Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=82mx3a0n
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXX (el token que acabás de crear)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

¡Listo! Ahora Vercel puede leer tu contenido de Sanity.
