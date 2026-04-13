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
import type { Category, Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  category?: Category
  onEdit: (product: Product) => void
  onDelete: (id: string) => void | Promise<void>
  isDeleting?: boolean
}

export const ProductCard = ({
  product,
  category,
  onEdit,
  onDelete,
  isDeleting,
}: ProductCardProps) => {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm">{product.name}</CardTitle>
        {category && (
          <CardDescription className="text-xs">{category.name}</CardDescription>
        )}
        <CardAction className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Edit ${product.name}`}
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Delete ${product.name}`}
                disabled={isDeleting}
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {product.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(product.id)}>
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
