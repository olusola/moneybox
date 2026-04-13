import { NextRequest, NextResponse } from "next/server"
import { DB_URL } from "@/lib/constants"

export async function GET() {
  const res = await fetch(`${DB_URL}/categories`, { cache: "no-store" })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch(`${DB_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
