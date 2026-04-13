import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "@/lib/api"
import type { Product } from "@/lib/types"
import { productsQueryKey } from "@/hooks/useProducts"

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      updateProduct(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: productsQueryKey() }),
  })
}
