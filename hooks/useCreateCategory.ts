import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/lib/api"
import { categoriesQueryKey } from "@/hooks/useCategories"

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
  })
}
