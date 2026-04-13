import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "@/lib/api"
import { productsQueryKey } from "@/hooks/useProducts"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: productsQueryKey() }),
  })
}
