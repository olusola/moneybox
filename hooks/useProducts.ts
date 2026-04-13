import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"

export const productsQueryKey = (categoryId?: string) =>
  categoryId ? ["products", categoryId] : ["products"]

export const useProducts = (categoryId?: string) =>
  useQuery({
    queryKey: productsQueryKey(categoryId),
    queryFn: () => fetchProducts(categoryId),
  })
