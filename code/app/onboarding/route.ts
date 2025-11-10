import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function getDestination(stage?: string, locked?: boolean) {
  if (stage === "ready") return "/ready"
  if (stage === "paid" || stage === "connected_google" || stage === "connected_meta") return "/connect"
  if (stage === "customized") return "/checkout"
  return locked ? "/checkout" : "/signup"
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const origin = new URL(request.url).origin

  if (!user) {
    return NextResponse.redirect(new URL("/login", origin))
  }

  // Check signup_progress table
  const { data: progress } = await supabase
    .from("signup_progress")
    .select("stage, customization_locked")
    .eq("auth_user_id", user.id)
    .maybeSingle()

  const destination = getDestination(progress?.stage, progress?.customization_locked)
  return NextResponse.redirect(new URL(destination, origin))
}
