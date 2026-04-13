import type { Category, Product } from "@/lib/types"
import { BASE_URL as BASE } from "@/lib/constants"

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/api/categories`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export async function fetchProducts(categoryId?: string): Promise<Product[]> {
  const url = categoryId
    ? `${BASE}/api/products?categoryId=${categoryId}`
    : `${BASE}/api/products`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function updateCategory(
  id: string,
  data: Partial<Category>
): Promise<Category> {
  const res = await fetch(`${BASE}/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update category")
  return res.json()
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product> {
  const res = await fetch(`${BASE}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function createCategory(
  data: Omit<Category, "id">
): Promise<Category> {
  const res = await fetch(`${BASE}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create category")
  return res.json()
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/categories/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete category")
}

export async function createProduct(
  data: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch(`${BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return res.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/products/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete product")
}
