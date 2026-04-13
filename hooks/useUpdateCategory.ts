import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategory } from "@/lib/api"
import type { Category } from "@/lib/types"
import { categoriesQueryKey } from "@/hooks/useCategories"

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
      updateCategory(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
  })
}
