import { NextRequest, NextResponse } from "next/server"
import { DB_URL } from "@/lib/constants"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const categoryId = searchParams.get("categoryId")
  const url = categoryId
    ? `${DB_URL}/products?categoryId=${categoryId}`
    : `${DB_URL}/products`
  const res = await fetch(url, { cache: "no-store" })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch(`${DB_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
