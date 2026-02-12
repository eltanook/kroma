import Image from "next/image"

interface SmartInsightProps {
  productName: string
  productImage: string
  material: string
  badge: string
  description: string
}

export function SmartInsight({
  productName,
  productImage,
  material,
  badge,
  description,
}: SmartInsightProps) {
  return (
    <aside className="my-10 mx-auto max-w-xl" aria-label={`Product recommendation: ${productName}`}>
      <div className="glass-card-hover rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-kroma-danger animate-pulse" aria-hidden="true" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Solucion KROMA
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-4 p-5">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-kroma-black">
            <Image
              src={productImage || "/placeholder.svg"}
              alt={productName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <h4 className="font-display text-sm font-semibold text-foreground">
              {productName}
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">{material}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="chrome-button rounded-md px-4 py-1.5 text-[10px] font-semibold tracking-wider"
              >
                Anadir al Pack
              </button>
              <span className="rounded-sm bg-kroma-danger/10 px-2 py-0.5 text-[10px] font-bold text-kroma-danger">
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
