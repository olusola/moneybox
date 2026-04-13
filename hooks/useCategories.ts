import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "@/lib/api"

export const categoriesQueryKey = ["categories"] as const

export const useCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: fetchCategories,
  })
