"use client"

import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import { useUpdateProduct } from "@/hooks/useUpdateProduct"
import { useDeleteProduct } from "@/hooks/useDeleteProduct"
import { useCreateCategory } from "@/hooks/useCreateCategory"
import { useUpdateCategory } from "@/hooks/useUpdateCategory"
import { useDeleteCategory } from "@/hooks/useDeleteCategory"
import type { Category, Product } from "@/lib/types"
import type { CategoryFormValues, ProductFormValues } from "@/lib/schemas"
import { EditDrawer } from "@/components/admin/editDrawer"
import { ProductForm } from "@/components/admin/productForm"
import { CategoryForm } from "@/components/admin/categoryForm"
import { ProductCard } from "@/components/admin/productCard"
import { CategoryCard } from "@/components/admin/categoryCard"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type DrawerState =
  | { type: "editProduct"; item: Product }
  | { type: "editCategory"; item: Category }
  | null

export const AdminClient = () => {
  const { data: categories = [] } = useCategories()
  const { data: products = [] } = useProducts()
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [mutationError, setMutationError] = useState<string | null>(null)

  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const getErrorMessage = (error: unknown) =>
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again."

  const closeDrawer = () => setDrawer(null)

  const handleCreateProduct = async (values: ProductFormValues) => {
    setMutationError(null)
    try {
      await createProduct.mutateAsync(values)
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  const handleCreateCategory = async (values: CategoryFormValues) => {
    setMutationError(null)
    try {
      await createCategory.mutateAsync(values)
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  const handleUpdateProduct = async (values: ProductFormValues) => {
    if (drawer?.type !== "editProduct") return
    setMutationError(null)
    try {
      await updateProduct.mutateAsync({ id: drawer.item.id, data: values })
      closeDrawer()
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  const handleUpdateCategory = async (values: CategoryFormValues) => {
    if (drawer?.type !== "editCategory") return
    setMutationError(null)
    try {
      await updateCategory.mutateAsync({ id: drawer.item.id, data: values })
      closeDrawer()
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    setMutationError(null)
    try {
      await deleteProduct.mutateAsync(id)
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  const handleDeleteCategory = async (id: string) => {
    setMutationError(null)
    try {
      await deleteCategory.mutateAsync(id)
    } catch (error) {
      setMutationError(getErrorMessage(error))
    }
  }

  return (
    <>
      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {mutationError && (
          <p
            role="alert"
            className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {mutationError}
          </p>
        )}

        {/* Products tab */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section aria-labelledby="products-form-heading">
              <h2
                id="products-form-heading"
                className="mb-4 text-base font-semibold tracking-tight"
              >
                Add product
              </h2>
              <div className="rounded-lg border p-4">
                <ProductForm
                  categories={categories}
                  onSubmit={handleCreateProduct}
                  isPending={createProduct.isPending}
                  submitLabel="Add product"
                />
              </div>
            </section>

            <section aria-labelledby="products-list-heading">
              <h2
                id="products-list-heading"
                className="mb-4 text-base font-semibold tracking-tight"
              >
                All products
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({products.length})
                </span>
              </h2>
              <Separator className="mb-4" />
              <ul className="flex list-none flex-col gap-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      category={categories.find(
                        (c) => c.id === product.categoryId
                      )}
                      onEdit={(p) =>
                        setDrawer({ type: "editProduct", item: p })
                      }
                      onDelete={handleDeleteProduct}
                      isDeleting={deleteProduct.isPending}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </TabsContent>

        {/* Categories tab */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section aria-labelledby="categories-form-heading">
              <h2
                id="categories-form-heading"
                className="mb-4 text-base font-semibold tracking-tight"
              >
                Add category
              </h2>
              <div className="rounded-lg border p-4">
                <CategoryForm
                  onSubmit={handleCreateCategory}
                  isPending={createCategory.isPending}
                  submitLabel="Add category"
                />
              </div>
            </section>

            <section aria-labelledby="categories-list-heading">
              <h2
                id="categories-list-heading"
                className="mb-4 text-base font-semibold tracking-tight"
              >
                All categories
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({categories.length})
                </span>
              </h2>
              <Separator className="mb-4" />
              <ul className="flex list-none flex-col gap-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <CategoryCard
                      category={category}
                      productCount={
                        products.filter((p) => p.categoryId === category.id)
                          .length
                      }
                      onEdit={(c) =>
                        setDrawer({ type: "editCategory", item: c })
                      }
                      onDelete={handleDeleteCategory}
                      isDeleting={deleteCategory.isPending}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit drawers */}
      <EditDrawer
        open={drawer?.type === "editProduct"}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Edit product"
        description="Update the product details below."
      >
        {drawer?.type === "editProduct" && (
          <ProductForm
            defaultValues={drawer.item}
            categories={categories}
            onSubmit={handleUpdateProduct}
            isPending={updateProduct.isPending}
            submitLabel="Update product"
          />
        )}
      </EditDrawer>

      <EditDrawer
        open={drawer?.type === "editCategory"}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Edit category"
        description="Update the category details below."
      >
        {drawer?.type === "editCategory" && (
          <CategoryForm
            defaultValues={drawer.item}
            onSubmit={handleUpdateCategory}
            isPending={updateCategory.isPending}
            submitLabel="Update category"
          />
        )}
      </EditDrawer>
    </>
  )
}
