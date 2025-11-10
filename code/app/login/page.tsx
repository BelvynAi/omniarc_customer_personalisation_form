"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSendMagicLink() {
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fffd9ef72068badb734955/f9934892f_Omniarclogo.png"
              alt="Omniarc Logo"
              className="h-12 w-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Check your email</h2>
          <p className="text-muted-foreground">
            We've sent a magic link to <strong>{email}</strong>. Click the link in the email to sign in.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fffd9ef72068badb734955/f9934892f_Omniarclogo.png"
            alt="Omniarc Logo"
            className="h-12 w-auto"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-3">Sign in to Omniarc</h1>
          <p className="text-muted-foreground">Enter your email and we'll send you a magic link to sign in</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-12"
            />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">{error}</div>}

          <Button onClick={handleSendMagicLink} disabled={!email || loading} className="w-full h-12 text-base">
            {loading ? "Sending..." : "Send magic link"}
          </Button>
        </div>
      </div>
    </div>
  )
}
