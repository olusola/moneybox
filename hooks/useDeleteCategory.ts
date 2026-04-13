import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "@/lib/api"
import { categoriesQueryKey } from "@/hooks/useCategories"

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
  })
}
