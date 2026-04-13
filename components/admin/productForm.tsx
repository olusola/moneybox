"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, type ProductFormValues } from "@/lib/schemas"
import type { Category, Product } from "@/lib/types"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ProductFormProps {
  defaultValues?: Product
  categories: Category[]
  onSubmit: (values: ProductFormValues) => void
  isPending?: boolean
  submitLabel?: string
}

export const ProductForm = ({
  defaultValues,
  categories,
  onSubmit,
  isPending,
  submitLabel = "Save",
}: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      categoryId: defaultValues?.categoryId ?? undefined,
      icon: defaultValues?.icon ?? "",
    },
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-name">Name</FieldLabel>
            <Input
              {...field}
              id="product-name"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "product-name-error" : undefined
              }
              placeholder="e.g. Cash ISA"
            />
            {fieldState.invalid && (
              <FieldError id="product-name-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="categoryId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-category">Category</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="product-category"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? "product-category-error" : undefined
                }
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && (
              <FieldError
                id="product-category-error"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-description">Description</FieldLabel>
            <Textarea
              {...field}
              id="product-description"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "product-description-error" : undefined
              }
              placeholder="Describe the product…"
              className="min-h-25"
            />
            {fieldState.invalid && (
              <FieldError
                id="product-description-error"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        name="icon"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-icon">Icon filename</FieldLabel>
            <Input
              {...field}
              id="product-icon"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "product-icon-error" : undefined
              }
              placeholder="e.g. cash_isa.svg"
            />
            {fieldState.invalid && (
              <FieldError id="product-icon-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  )
}
