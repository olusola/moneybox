import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "@/lib/api"
import { productsQueryKey } from "@/hooks/useProducts"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: productsQueryKey() }),
  })
}
