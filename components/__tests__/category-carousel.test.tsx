import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CategoryCarousel } from "@/components/categoryCarousel"

vi.mock("@/hooks/useCategories", () => ({ useCategories: vi.fn() }))
vi.mock("@/hooks/useProducts", () => ({ useProducts: vi.fn() }))

import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"

const mockCategories = [
  { id: "1", name: "Savings", slug: "savings" },
  { id: "2", name: "Home Buying", slug: "home-buying" },
  { id: "3", name: "Investing", slug: "investing" },
]

const mockProducts = [
  {
    id: "1",
    categoryId: "1",
    name: "Cash ISA",
    icon: "cash_isa.svg",
    description: "A savings account.",
  },
  {
    id: "2",
    categoryId: "2",
    name: "Lifetime ISA",
    icon: "lisa.svg",
    description: "For first-time buyers.",
  },
]

beforeEach(() => {
  vi.mocked(useCategories).mockReturnValue({
    data: mockCategories,
  } as ReturnType<typeof useCategories>)
  vi.mocked(useProducts).mockReturnValue({ data: mockProducts } as ReturnType<
    typeof useProducts
  >)
})

describe("CategoryCarousel", () => {
  it("renders all three category slots", () => {
    render(<CategoryCarousel />)
    // All three categories should be visible (first active is index 0: Savings)
    expect(screen.getByText("Savings")).toBeInTheDocument()
    expect(screen.getByText("Home Buying")).toBeInTheDocument()
    expect(screen.getByText("Investing")).toBeInTheDocument()
  })

  it("shows the first category as active by default", () => {
    render(<CategoryCarousel />)
    const activeSlot = screen.getByRole("region", {
      name: "Savings products",
    })
    expect(activeSlot).toBeInTheDocument()
    expect(activeSlot).toHaveTextContent("Savings")
  })

  it("shows the active category's products", () => {
    render(<CategoryCarousel />)
    expect(screen.getByText("Cash ISA")).toBeInTheDocument()
  })

  it("advances to next category on clicking next button", async () => {
    const user = userEvent.setup()
    render(<CategoryCarousel />)

    const nextBtn = screen.getByRole("button", { name: "Next category" })
    await user.click(nextBtn)

    // After clicking next, Home Buying becomes active
    const activeSlot = screen.getByRole("region", {
      name: "Home Buying products",
    })
    expect(activeSlot).toHaveTextContent("Home Buying")
  })

  it("goes to previous category on clicking previous button", async () => {
    const user = userEvent.setup()
    render(<CategoryCarousel />)

    const prevBtn = screen.getByRole("button", { name: "Previous category" })
    await user.click(prevBtn)

    // Clicking prev from index 0 wraps to last: Investing
    const activeSlot = screen.getByRole("region", {
      name: "Investing products",
    })
    expect(activeSlot).toHaveTextContent("Investing")
  })

  it("returns null when there are no categories", () => {
    vi.mocked(useCategories).mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useCategories>)
    const { container } = render(<CategoryCarousel />)
    expect(container.firstChild).toBeNull()
  })
})
