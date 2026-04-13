"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductItemProps {
  product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const [iconFailed, setIconFailed] = useState(false)

  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-visible rounded-lg border bg-background"
    >
      <AccordionItem value={String(product.id)}>
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
          {product.name}
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="flex items-start gap-4">
            {!iconFailed && (
              <div className="shrink-0 rounded-md border bg-background p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/${product.icon}`}
                  alt={product.name}
                  width={40}
                  height={40}
                  onError={() => setIconFailed(true)}
                />
              </div>
            )}
            <p className="line-clamp-5 text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
