import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers and hyphens only"
    ),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  categoryId: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon filename is required"),
})

export type ProductFormValues = z.infer<typeof productSchema>
