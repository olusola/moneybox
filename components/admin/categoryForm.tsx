"use client"

import { useEffect } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema, type CategoryFormValues } from "@/lib/schemas"
import type { Category } from "@/lib/types"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CategoryFormProps {
  defaultValues?: Category
  onSubmit: (values: CategoryFormValues) => void
  isPending?: boolean
  submitLabel?: string
}

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = "Save",
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      slug: defaultValues?.slug ?? "",
    },
  })

  // get slug from name on create (not edit)
  const nameValue = useWatch({ control: form.control, name: "name" })

  useEffect(() => {
    if (!defaultValues) {
      form.setValue(
        "slug",
        nameValue
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      )
    }
  }, [nameValue, defaultValues, form])

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
            <FieldLabel htmlFor="category-name">Name</FieldLabel>
            <Input
              {...field}
              id="category-name"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "category-name-error" : undefined
              }
              placeholder="e.g. Savings"
            />
            {fieldState.invalid && (
              <FieldError
                id="category-name-error"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="category-slug">Slug</FieldLabel>
            <Input
              {...field}
              id="category-slug"
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? "category-slug-error" : undefined
              }
              placeholder="e.g. savings"
            />
            {fieldState.invalid && (
              <FieldError
                id="category-slug-error"
                errors={[fieldState.error]}
              />
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
