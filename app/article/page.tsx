import { Navbar } from "@/components/kroma/navbar"
import { ReadingProgress } from "@/components/kroma/reading-progress"
import { SmartInsight } from "@/components/kroma/smart-insight"
import { Footer } from "@/components/kroma/footer"
import { ContextualProductCard } from "@/components/kroma/contextual-product-card"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Por Que Tu Tabla de Picar Te Esta Envenenando | KROMA Journal",
  description:
    "Cada corte en una tabla de plastico libera microparticulas que terminan en tu comida. La ciencia es clara sobre los peligros del plastico en tu cocina.",
}

export default function ArticlePage() {
  return (
    <>
      <CustomCursor />
      <ReadingProgress />
      <Navbar />

      <article className="relative pt-24">
        {/* Hero Image */}
        <header className="relative">
          <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-12">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    KROMA
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#journal" className="transition-colors hover:text-foreground">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground">Cocina Detox</li>
              </ol>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="rounded-sm bg-foreground/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-foreground uppercase backdrop-blur-sm">
                Investigacion
              </span>
              <span className="text-xs text-muted-foreground">8 min lectura</span>
              <span className="text-xs text-muted-foreground">Enero 2026</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance max-w-4xl">
              Por Que Tu Tabla de Picar Te Esta{" "}
              <span className="text-orange-500">Envenenando</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Cada corte en una tabla de plastico libera microparticulas
              invisibles que terminan directamente en tu comida. Los estudios
              cientificos son claros, y la industria no quiere que lo sepas.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
              <Image
                src="/images/article-kitchen.jpg"
                alt="Vista aerea de una cocina con utensilios de plastico"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </header>

        {/* Article Body with Sidebar */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="blog-content">
              {/* Section 1 */}
              <section aria-labelledby="section-plastic-reality">
                <h2
                  id="section-plastic-reality"
                  className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  La realidad del plastico en tu cocina
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Un estudio publicado en <em>Environmental Science & Technology</em>{" "}
                  revelo que una sola tabla de picar de plastico puede liberar entre{" "}
                  <strong className="text-foreground">14 y 71 millones de microparticulas</strong>{" "}
                  al ano. Estas particulas son lo suficientemente pequenas para
                  penetrar las paredes celulares y entrar en tu torrente sanguineo.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Cada vez que el cuchillo toca la superficie plastica, genera surcos
                  microscopicos. Esos surcos liberan fragmentos que miden menos de 5
                  micrometros — invisibles al ojo humano, pero devastadores para tu
                  sistema endocrino. El polipropileno y el polietileno, los plasticos
                  mas comunes en tablas de cocina, son los principales culpables.
                </p>

                {/* Data callout */}
                <div className="my-10 glass-card rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kroma-danger/10">
                      <svg className="h-5 w-5 text-kroma-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">
                        Dato critico
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Segun la Universidad de Newcastle (Australia), una persona promedio
                        ingiere aproximadamente{" "}
                        <strong className="text-kroma-danger">5 gramos de plastico a la semana</strong>
                        {" — "}el equivalente a una tarjeta de credito.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Lo alarmante no es solo la cantidad, sino la acumulacion. Estos
                  microplasticos transportan aditivos quimicos como ftalatos, bisfenol A
                  (BPA) y retardantes de llama. Una vez en tu cuerpo, actuan como
                  disruptores endocrinos, imitando hormonas naturales y alterando
                  procesos biologicos fundamentales.
                </p>
              </section>

              {/* Smart Insight - Contextual Commerce */}
              <SmartInsight
                productName="KROMA Solid Wood Board"
                productImage="/images/product-board.jpg"
                material="Nogal Americano Macizo"
                badge="0% MICROPLASTICOS"
                description="Superficie antibacteriana natural que se sella con cada uso. Sin surcos microscopicos. Sin particulas en tu comida."
              />

              {/* Section 2 */}
              <section aria-labelledby="section-endocrine" className="mt-16">
                <h2
                  id="section-endocrine"
                  className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  El sistema endocrino bajo ataque
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Tu sistema endocrino regula practicamente todo: metabolismo, sueno,
                  fertilidad, estado de animo. Los disruptores hormonales del plastico
                  interfieren con estas senales a niveles increiblemente bajos —
                  partes por billon. La ciencia los llama {"\""}xenoestrogenos{"\""}: moleculas
                  sinteticas que tu cuerpo confunde con estrogeno real.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Los efectos documentados incluyen: disminucion de la fertilidad
                  masculina (la cuenta espermatica ha caido un 50% desde 1973),
                  pubertad precoz en ninas, aumento de canceres hormonodependientes, y
                  alteraciones tiroideas. Todo esto vinculado al contacto diario con
                  plasticos que calientas, cortas y almacenas en tu cocina.
                </p>

                {/* Quote */}
                <blockquote className="my-10 border-l-2 border-zinc-700 pl-6">
                  <p className="text-base italic leading-relaxed text-foreground/80">
                    {
                      "\"No existe un nivel seguro de exposicion a disruptores endocrinos. La dosis no hace al veneno cuando hablamos de hormonas.\""
                    }
                  </p>
                  <cite className="mt-3 block text-xs font-medium text-muted-foreground not-italic">
                    {"— Dra. Ana Soto, Tufts University School of Medicine"}
                  </cite>
                </blockquote>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  La solucion no es comprar plasticos {"\""}libres de BPA{"\""} — muchos
                  reemplazos como el BPS y BPF son igual de daninos. La solucion
                  real es eliminar el plastico del contacto con alimentos por completo
                  y migrar a materiales inertes: acero inoxidable, vidrio borosilicato
                  y madera tratada naturalmente.
                </p>
              </section>

              {/* Smart Insight - Contextual Commerce 2 */}
              <SmartInsight
                productName="KROMA Glass Container Set"
                productImage="/images/product-container.jpg"
                material="Vidrio Borosilicato + Acero"
                badge="CERO MIGRACION QUIMICA"
                description="Vidrio de grado laboratorio que no transfiere absolutamente nada a tu comida. Tapa de acero hermetica. Apto para horno, nevera y congelador."
              />

              {/* Section 3 */}
              <section aria-labelledby="section-solution" className="mt-16">
                <h2
                  id="section-solution"
                  className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  La alternativa: materiales que no te traicionan
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  El acero inoxidable 304 (grado alimentario) es completamente inerte
                  ante acidos, sales y temperaturas extremas. No libera particulas, no
                  absorbe olores, no se degrada. El vidrio borosilicato soporta
                  choques termicos de hasta 300 grados Celsius sin liberar una sola
                  molecula. La madera de nogal tiene propiedades antibacterianas
                  naturales — las bacterias mueren en su superficie en minutos.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Estos no son materiales nuevos. Son los materiales que usaban tus
                  abuelos antes de que la industria petroquimica los reemplazara por
                  derivados baratos del petroleo. KROMA los trae de vuelta, con diseno
                  contemporaneo y la ciencia de materiales del siglo XXI.
                </p>
              </section>

              {/* CTA at end of article */}
              <div className="mt-20 text-center">
                <div className="glass-card rounded-xl p-8">
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Haz el cambio hoy
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                    Pack Cocina <span className="chrome-text">KROMA</span>
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Todo lo que necesitas para eliminar el plastico de tu cocina en un
                    solo paso. Envio gratuito.
                  </p>
                  <a
                    href="/#productos"
                    className="chrome-button mt-6 inline-block rounded-full px-8 py-3 text-sm font-semibold tracking-wide"
                  >
                    Ver el Pack Completo
                  </a>
                </div>
              </div>

              {/* Related Articles */}
              <nav className="mt-20 border-t border-border pt-10" aria-label="Related articles">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Sigue investigando
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/article"
                    className="glass-card-hover group flex flex-col gap-3 rounded-lg p-5"
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Hormonas
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground leading-tight">
                      BPA y Disruptores Hormonales: La Epidemia Silenciosa
                    </span>
                    <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      Leer articulo {"->"}
                    </span>
                  </Link>
                  <Link
                    href="/article"
                    className="glass-card-hover group flex flex-col gap-3 rounded-lg p-5"
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Ciencia de Materiales
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground leading-tight">
                      Acero 304 vs Plastico: Guia Definitiva de Materiales
                    </span>
                    <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      Leer articulo {"->"}
                    </span>
                  </Link>
                </div>
              </nav>
            </div> {/* End main content */}

            {/* Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block">
              <ContextualProductCard
                title="KROMA Steel Bottle 750ml"
                description="Botella de acero inoxidable 304 con doble pared aislante. Mantiene bebidas frías 24h y calientes 12h. Sin BPA ni toxicos."
                price="€49.00"
                image="/images/product-bottle.jpg"
                features={[
                  "Acero inoxidable 304",
                  "Doble pared aislante",
                  "Garantía de por vida"
                ]}
              />
            </aside>
          </div> {/* End grid */}
        </div> {/* End container */}
      </article>

      <Footer />
    </>
  )
}
