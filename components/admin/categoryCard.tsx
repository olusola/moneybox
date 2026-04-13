"use client"

import { Pencil, Trash2 } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
  productCount: number
  onEdit: (category: Category) => void
  onDelete: (id: string) => void | Promise<void>
  isDeleting?: boolean
}

export const CategoryCard = ({
  category,
  productCount,
  onEdit,
  onDelete,
  isDeleting,
}: CategoryCardProps) => {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm">{category.name}</CardTitle>
        <CardDescription className="text-xs">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </CardDescription>
        <CardAction className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Edit ${category.name}`}
            onClick={() => onEdit(category)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Delete ${category.name}`}
                disabled={isDeleting}
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {category.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will not delete associated products but they will become
                  uncategorised.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(category.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
