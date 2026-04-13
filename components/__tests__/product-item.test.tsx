import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProductItem } from "@/components/productItem"

const mockProduct = {
  id: "1",
  categoryId: "1",
  name: "Cash ISA",
  icon: "cash_isa.svg",
  description: "A tax-free savings account.",
}

const renderItem = () => render(<ProductItem product={mockProduct} />)

describe("ProductItem", () => {
  it("renders the product name as a trigger", () => {
    renderItem()
    expect(
      screen.getByRole("button", { name: /cash isa/i })
    ).toBeInTheDocument()
  })

  it("description is not visible before expanding", () => {
    renderItem()
    expect(
      screen.queryByText("A tax-free savings account.")
    ).not.toBeInTheDocument()
  })

  it("expands to show the description on click", async () => {
    const user = userEvent.setup()
    renderItem()
    const trigger = screen.getByRole("button", { name: /cash isa/i })
    await user.click(trigger)
    expect(screen.getByText("A tax-free savings account.")).toBeVisible()
  })

  it("renders the product icon image", async () => {
    const user = userEvent.setup()
    renderItem()
    const trigger = screen.getByRole("button", { name: /cash isa/i })
    await user.click(trigger)
    expect(screen.getByAltText("Cash ISA")).toBeInTheDocument()
  })
})
