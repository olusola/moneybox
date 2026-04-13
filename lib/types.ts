export type Category = {
  id: string
  name: string
  slug: string
}

export type Product = {
  id: string
  categoryId: string
  name: string
  icon: string
  description: string
}
