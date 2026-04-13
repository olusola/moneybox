"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"
import { ProductList } from "@/components/productList"
import { cn } from "@/lib/utils"
import { FOCUS_RING_CLASSES } from "@/lib/constants"

export const CategoryCarousel = () => {
  const { data: categories = [] } = useCategories()
  const { data: allProducts = [] } = useProducts()
  const [activeIndex, setActiveIndex] = useState(0)

  if (categories.length === 0) return null

  const total = categories.length
  const previousIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  const activeCategory = categories[activeIndex]
  const previousCategory = categories[previousIndex]
  const nextCategory = categories[nextIndex]

  const activeProducts = allProducts.filter(
    (product) => product.categoryId === activeCategory.id
  )

  const activateACategory = (index: number) => setActiveIndex(index)
  const activatePreviousCategory = () => activateACategory(previousIndex)
  const activateNextCategory = () => activateACategory(nextIndex)

  return (
    <section aria-label="Explore Accounts">
      <div className="mb-6 flex items-center justify-center gap-2">
        <button
          onClick={activatePreviousCategory}
          aria-label="Previous category"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted",
            FOCUS_RING_CLASSES
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-base font-medium">Explore Accounts</h2>
        <button
          onClick={activateNextCategory}
          aria-label="Next category"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted",
            FOCUS_RING_CLASSES
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <nav
        aria-label="Product categories"
        className="grid grid-cols-1 items-start gap-4 md:grid-cols-3"
      >
        {/* Previous category */}
        <button
          onClick={activatePreviousCategory}
          className={cn(
            "hidden w-full rounded-lg bg-muted px-4 py-5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/70 md:block",
            FOCUS_RING_CLASSES
          )}
        >
          {previousCategory.name}
        </button>

        {/* Active category */}
        <div
          role="region"
          aria-label={`${activeCategory.name} products`}
          aria-live="polite"
          aria-atomic="true"
          className="overflow-hidden rounded-lg bg-primary/5"
        >
          <div className="bg-primary px-4 py-5 text-center text-sm font-semibold text-primary-foreground">
            {activeCategory.name}
          </div>
          <ProductList products={activeProducts} />
        </div>

        {/* Next category */}
        <button
          onClick={activateNextCategory}
          className={cn(
            "hidden w-full rounded-lg bg-muted px-4 py-5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/70 md:block",
            FOCUS_RING_CLASSES,
            total <= 2 && "md:invisible"
          )}
        >
          {nextCategory.name}
        </button>
      </nav>
    </section>
  )
}
