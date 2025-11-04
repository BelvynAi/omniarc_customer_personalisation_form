"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store in sessionStorage as fallback
    if (typeof window !== "undefined") {
      sessionStorage.setItem("omniarc_signup", JSON.stringify(formData))
    }

    // Navigate to customization form
    router.push("/customize")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/design-mode/f9934892f_Omniarclogo(2).png"
            alt="Omniarc Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Title and subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-3 text-balance">Create your Omniarc Account</h1>
          <p className="text-muted-foreground text-pretty">
            Next, you&#39;ll configure your very own Omniarc Agent. This takes under 10 minutes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12 text-base">
            Get started →
          </Button>
        </form>
      </div>
    </div>
  )
}
