import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import type { Metadata } from "next"
import { fetchCategories, fetchProducts } from "@/lib/api"
import { categoriesQueryKey } from "@/hooks/useCategories"
import { productsQueryKey } from "@/hooks/useProducts"
import { AdminClient } from "@/components/admin/adminClient"

export const metadata: Metadata = {
  title: "Manage Products | Moneybox",
}

const AdminPage = async () => {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: categoriesQueryKey,
      queryFn: fetchCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: productsQueryKey(),
      queryFn: () => fetchProducts(),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-8 text-2xl font-bold tracking-tight">
          Manage Products
        </h1>
        <AdminClient />
      </div>
    </HydrationBoundary>
  )
}

export default AdminPage
