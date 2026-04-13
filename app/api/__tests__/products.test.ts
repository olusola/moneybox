import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { NextRequest } from "next/server"
import { GET } from "@/app/api/products/route"
import { PUT, DELETE } from "@/app/api/products/[id]/route"

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal("fetch", mockFetch)

function createDummyProducts(ids: string[]) {
  return ids.map((id) => ({
    id,
    categoryId: "1",
    name: `Product ${id}`,
    icon: "icon.svg",
    description: "desc",
  }))
}

beforeEach(() => {
  mockFetch.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("GET /api/products", () => {
  it("returns all products", async () => {
    const products = createDummyProducts(["1", "2", "3"])
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => products,
    })
    const req = new NextRequest("http://localhost:3000/api/products")
    const res = await GET(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(3)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/products"),
      expect.any(Object)
    )
  })

  it("filters by categoryId when param is provided", async () => {
    const products = createDummyProducts(["1"])
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => products,
    })

    const req = new NextRequest(
      "http://localhost:3000/api/products?categoryId=1"
    )
    const res = await GET(req)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("categoryId=1"),
      expect.any(Object)
    )
  })
})

describe("PUT /api/products/[id]", () => {
  it("updates the product and returns updated data", async () => {
    const updated = {
      id: "1",
      categoryId: "1",
      name: "Updated",
      icon: "icon.svg",
      description: "new desc",
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => updated,
    })

    const req = new NextRequest("http://localhost:3000/api/products/1", {
      method: "PUT",
      body: JSON.stringify({ name: "Updated" }),
      headers: { "Content-Type": "application/json" },
    })
    const res = await PUT(req, { params: Promise.resolve({ id: "1" }) })
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.name).toBe("Updated")
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/products/1"),
      expect.objectContaining({ method: "PUT" })
    )
  })
})

describe("DELETE /api/products/[id]", () => {
  it("deletes the product and returns 200", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 })

    const req = new NextRequest("http://localhost:3000/api/products/1", {
      method: "DELETE",
    })
    const res = await DELETE(req, { params: Promise.resolve({ id: "1" }) })

    expect(res.status).toBe(200)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/products/1"),
      expect.objectContaining({ method: "DELETE" })
    )
  })
})
