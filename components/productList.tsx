import type { Product } from "@/lib/types"
import { ProductItem } from "@/components/productItem"

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <p className="px-4 py-6 text-center text-sm text-muted-foreground">
        No products available.
      </p>
    )
  }

  return (
    <ul className="list-none space-y-2 p-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  )
}
