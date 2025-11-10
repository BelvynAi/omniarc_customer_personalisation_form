import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

const PROTECTED_ROUTES = ["/signup", "/customize", "/welcome", "/connect", "/checkout", "/ready"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  if (!isProtected) {
    return NextResponse.next()
  }

  // Check authentication
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if trying to access /customize when locked
  if (pathname.startsWith("/customize")) {
    const { data: progress } = await supabase
      .from("signup_progress")
      .select("customization_locked")
      .eq("auth_user_id", user.id)
      .maybeSingle()

    if (progress?.customization_locked) {
      return NextResponse.redirect(new URL("/onboarding", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
}
