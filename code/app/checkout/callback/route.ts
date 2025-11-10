import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  // Stripe webhook in n8n will update stage to 'paid'
  // We just route back through onboarding to determine next step
  return NextResponse.redirect(new URL("/onboarding", url.origin))
}
