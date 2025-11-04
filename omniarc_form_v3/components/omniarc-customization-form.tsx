"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Plus, X } from "lucide-react"

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const TIMEZONES = [
  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Adelaide",
  "Australia/Perth",
  "Australia/Hobart",
  "Australia/Darwin",
  "Australia/Canberra",
  "Australia/Lord_Howe",
  "Australia/Eucla",
]

const TIME_SLOTS = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
]

const AGENT_PERSONALITIES = ["Professional", "Friendly", "Casual"]

const COUNTRY_CODES = [
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", country: "Albania", flag: "🇦🇱" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+376", country: "Andorra", flag: "🇦🇩" },
  { code: "+244", country: "Angola", flag: "🇦🇴" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+374", country: "Armenia", flag: "🇦🇲" },
  { code: "+297", country: "Aruba", flag: "🇦🇼" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+375", country: "Belarus", flag: "🇧🇾" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+501", country: "Belize", flag: "🇧🇿" },
  { code: "+229", country: "Benin", flag: "🇧🇯" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴" },
  { code: "+387", country: "Bosnia", flag: "🇧🇦" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+673", country: "Brunei", flag: "🇧🇳" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
  { code: "+257", country: "Burundi", flag: "🇧🇮" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲" },
  { code: "+1", country: "Canada/USA", flag: "🇨🇦" },
  { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
  { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
  { code: "+235", country: "Chad", flag: "🇹🇩" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+269", country: "Comoros", flag: "🇰🇲" },
  { code: "+242", country: "Congo", flag: "🇨🇬" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+53", country: "Cuba", flag: "🇨🇺" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+253", country: "Djibouti", flag: "🇩🇯" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+291", country: "Eritrea", flag: "🇪🇷" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+679", country: "Fiji", flag: "🇫🇯" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+241", country: "Gabon", flag: "🇬🇦" },
  { code: "+220", country: "Gambia", flag: "🇬🇲" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+224", country: "Guinea", flag: "🇬🇳" },
  { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+592", country: "Guyana", flag: "🇬🇾" },
  { code: "+509", country: "Haiti", flag: "🇭🇹" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+354", country: "Iceland", flag: "🇮🇸" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+266", country: "Lesotho", flag: "🇱🇸" },
  { code: "+231", country: "Liberia", flag: "🇱🇷" },
  { code: "+218", country: "Libya", flag: "🇱🇾" },
  { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+389", country: "Macedonia", flag: "🇲🇰" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬" },
  { code: "+265", country: "Malawi", flag: "🇲🇼" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+356", country: "Malta", flag: "🇲🇹" },
  { code: "+222", country: "Mauritania", flag: "🇲🇷" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+373", country: "Moldova", flag: "🇲🇩" },
  { code: "+377", country: "Monaco", flag: "🇲🇨" },
  { code: "+976", country: "Mongolia", flag: "🇲🇳" },
  { code: "+382", country: "Montenegro", flag: "🇲🇪" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+258", country: "Mozambique", flag: "🇲🇿" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+227", country: "Niger", flag: "🇳🇪" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+850", country: "North Korea", flag: "🇰🇵" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+970", country: "Palestine", flag: "🇵🇸" },
  { code: "+507", country: "Panama", flag: "🇵🇦" },
  { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+221", country: "Senegal", flag: "🇸🇳" },
  { code: "+381", country: "Serbia", flag: "🇷🇸" },
  { code: "+248", country: "Seychelles", flag: "🇸🇨" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮" },
  { code: "+252", country: "Somalia", flag: "🇸🇴" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+211", country: "South Sudan", flag: "🇸🇸" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+249", country: "Sudan", flag: "🇸🇩" },
  { code: "+597", country: "Suriname", flag: "🇸🇷" },
  { code: "+268", country: "Swaziland", flag: "🇸🇿" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+963", country: "Syria", flag: "🇸🇾" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+228", country: "Togo", flag: "🇹🇬" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
  { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+967", country: "Yemen", flag: "🇾🇪" },
  { code: "+260", country: "Zambia", flag: "🇿🇲" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
]

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
}

export function OmniarcCustomizationForm() {
  const router = useRouter()
  const [signupData, setSignupData] = useState<SignupData | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: "1", question: "", answer: "" },
    { id: "2", question: "", answer: "" },
    { id: "3", question: "", answer: "" },
  ])

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    businessName: "",
    email: "",
    phone: "",
    phoneCountryCode: "+61",
    websiteDomain: "",
    businessLocation: "",
    businessIndustry: "",
    businessType: "",
    businessDescription: "",
    logoUrl: "",
    brandColours: "#0F1C3B",
    accentColours: "#2EC4FF",
    backgroundColour: "#FFFFFF",
    agentPersonality: "",
    calendarIntegration: "Google Calendar (Direct Integration)",
    bookingLink: "",
    timezone: "",
    earliestBookingTime: "",
    latestBookingTime: "",
    minimumNoticeHours: "",
    maximumBookingDays: "",
    eventType: "",
    servicesOffered: "",
    eventSummary: "",
    preBookingQuestion1: "",
    preBookingQuestion2: "",
    additionalBusinessDetails: "",
  })

  const [charLimitErrors, setCharLimitErrors] = useState<Record<string, boolean>>({})
  const [urlError, setUrlError] = useState(false)
  const [hexColorErrors, setHexColorErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("omniarc_signup")
      if (storedData) {
        setSignupData(JSON.parse(storedData))
      } else {
        router.push("/signup")
      }
    }
  }, [router])

  const isGoogle = formData.calendarIntegration === "Google Calendar (Direct Integration)"
  const isOther = formData.calendarIntegration === "Other"

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const validateCharLimit = (fieldName: string, value: string, limit: number) => {
    const isExceeded = value.length > limit
    setCharLimitErrors((prev) => ({
      ...prev,
      [fieldName]: isExceeded,
    }))
    return !isExceeded
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      setUrlError(false)
      return true
    } catch {
      setUrlError(true)
      return false
    }
  }

  const validateHexColor = (fieldName: string, value: string) => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const isValid = hexRegex.test(value)
    setHexColorErrors((prev) => ({
      ...prev,
      [fieldName]: !isValid && value.length > 0,
    }))
    return isValid || value.length === 0
  }

  const addFAQ = () => {
    if (faqs.length < 20) {
      const newId = (faqs.length + 1).toString()
      setFaqs([...faqs, { id: newId, question: "", answer: "" }])
    }
  }

  const removeFAQ = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((faq) => faq.id !== id))
    }
  }

  const updateFAQ = (id: string, field: "question" | "answer", value: string) => {
    setFaqs(faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (isOther && formData.bookingLink && !validateUrl(formData.bookingLink)) {
      setIsSubmitting(false)
      return
    }

    try {
      const payload: Record<string, unknown> = {
        firstName: signupData?.firstName,
        lastName: signupData?.lastName,
        email: signupData?.email,
        businessName: formData.businessName,
        businessEmail: formData.email,
        phone: `${formData.phoneCountryCode} ${formData.phone}`,
        websiteDomain: formData.websiteDomain,
        businessLocation: formData.businessLocation,
        businessIndustry: formData.businessIndustry,
        businessType: formData.businessType,
        businessDescription: formData.businessDescription,
        logoUrl: formData.logoUrl,
        brandColours: formData.brandColours,
        accentColours: formData.accentColours,
        backgroundColour: formData.backgroundColour,
        agentPersonality: formData.agentPersonality,
        calendarIntegration: formData.calendarIntegration,
        timezone: formData.timezone,
        eventType: formData.eventType,
        servicesOffered: formData.servicesOffered,
        eventSummary: formData.eventSummary,
        preBookingQuestion1: formData.preBookingQuestion1,
        preBookingQuestion2: formData.preBookingQuestion2,
        additionalBusinessDetails: formData.additionalBusinessDetails,
      }

      faqs.forEach((faq, index) => {
        const faqNum = index + 1
        payload[`faq${faqNum}Question`] = faq.question
        payload[`faq${faqNum}Answer`] = faq.answer
      })

      if (isGoogle) {
        payload.earliestBookingTime = formData.earliestBookingTime
        payload.latestBookingTime = formData.latestBookingTime
        payload.minimumNoticeHours = formData.minimumNoticeHours
        payload.maximumBookingDays = formData.maximumBookingDays
        payload.bookingDays = selectedDays
      }

      if (isOther) {
        payload.bookingLink = formData.bookingLink
      }

      const response = await fetch("https://n8n.srv896614.hstgr.cloud/webhook/omniarc-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("omniarc_signup")
      }

      setFormData({
        customerName: "",
        customerEmail: "",
        businessName: "",
        email: "",
        phone: "",
        phoneCountryCode: "+61",
        websiteDomain: "",
        businessLocation: "",
        businessIndustry: "",
        businessType: "",
        businessDescription: "",
        logoUrl: "",
        brandColours: "#0F1C3B",
        accentColours: "#2EC4FF",
        backgroundColour: "#FFFFFF",
        agentPersonality: "",
        calendarIntegration: "Google Calendar (Direct Integration)",
        bookingLink: "",
        timezone: "",
        earliestBookingTime: "",
        latestBookingTime: "",
        minimumNoticeHours: "",
        maximumBookingDays: "",
        eventType: "",
        servicesOffered: "",
        eventSummary: "",
        preBookingQuestion1: "",
        preBookingQuestion2: "",
        additionalBusinessDetails: "",
      })
      setSelectedDays([])
      setFaqs([
        { id: "1", question: "", answer: "" },
        { id: "2", question: "", answer: "" },
        { id: "3", question: "", answer: "" },
      ])
      setCharLimitErrors({})
      setUrlError(false)
      setHexColorErrors({})
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!signupData) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/images/design-mode/f9934892f_Omniarclogo(2).png"
              alt="Omniarc Logo"
              className="h-12 w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Signed in as {signupData.firstName} {signupData.lastName} · {signupData.email}
          </p>
          <h2 className="text-2xl font-semibold text-foreground mb-2 text-balance">{"Business Customisation Form"}</h2>
          <p className="text-muted-foreground text-pretty">
            {"Configure your AI assistant to match your brand and business needs"}
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {"Form submitted successfully! We'll be in touch soon."}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {"There was an error submitting the form. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>{"Business Information"}</CardTitle>
              <CardDescription>{"Basic details about your business"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">{"Business Name"}</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("businessName", value, 50)
                    setFormData({ ...formData, businessName: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.businessName && (
                  <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{"Business Email Address"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{"Business Phone Number"}</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.phoneCountryCode}
                      onValueChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {`${country.flag} ${country.code}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="4XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteDomain">
                  {"Website Domain "}
                  <span className="text-muted-foreground text-sm font-normal">
                    {"(must be where you'll host the Omniarc widget, otherwise it will not work)"}
                  </span>
                </Label>
                <Input
                  id="websiteDomain"
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={formData.websiteDomain}
                  onChange={(e) => setFormData({ ...formData, websiteDomain: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLocation">{"Business Location"}</Label>
                <Input
                  id="businessLocation"
                  placeholder="Sydney, NSW"
                  value={formData.businessLocation}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("businessLocation", value, 50)
                    setFormData({ ...formData, businessLocation: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.businessLocation && (
                  <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessIndustry">{"Business Industry"}</Label>
                  <Input
                    id="businessIndustry"
                    placeholder="e.g., Marketing"
                    value={formData.businessIndustry}
                    onChange={(e) => {
                      const value = e.target.value
                      validateCharLimit("businessIndustry", value, 50)
                      setFormData({ ...formData, businessIndustry: value })
                    }}
                    required
                    maxLength={50}
                  />
                  {charLimitErrors.businessIndustry && (
                    <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">{"Business Type"}</Label>
                  <Input
                    id="businessType"
                    placeholder="e.g., Advertising Agency"
                    value={formData.businessType}
                    onChange={(e) => {
                      const value = e.target.value
                      validateCharLimit("businessType", value, 50)
                      setFormData({ ...formData, businessType: value })
                    }}
                    required
                    maxLength={50}
                  />
                  {charLimitErrors.businessType && (
                    <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">{"Business Description"}</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Describe what your business does in an engaging, advertising-style way"
                  value={formData.businessDescription}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("businessDescription", value, 700)
                    setFormData({ ...formData, businessDescription: value })
                  }}
                  rows={4}
                  required
                  maxLength={700}
                />
                <p className="text-sm text-muted-foreground">{`${formData.businessDescription.length}/700 characters`}</p>
                {charLimitErrors.businessDescription && (
                  <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Brand Customization */}
          <Card>
            <CardHeader>
              <CardTitle>{"Brand Customisation"}</CardTitle>
              <CardDescription>{"Customise the look and feel of your booking assistant"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">{"Logo URL"}</Label>
                <Input
                  id="logoUrl"
                  type="url"
                  placeholder="https://yourbusiness.com/logo.png"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="brandColours">{"Primary Colour"}</Label>
                  <div className="relative">
                    <Input
                      id="brandColours"
                      placeholder="#0F1C3B"
                      value={formData.brandColours}
                      onChange={(e) => {
                        const value = e.target.value
                        validateCharLimit("brandColours", value, 50)
                        validateHexColor("brandColours", value)
                        setFormData({ ...formData, brandColours: value })
                      }}
                      required
                      maxLength={50}
                      className="pr-12"
                    />
                    {formData.brandColours && !hexColorErrors.brandColours && (
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: formData.brandColours }}
                      />
                    )}
                  </div>
                  {hexColorErrors.brandColours && (
                    <p className="text-sm text-red-600">{"Please enter a valid hex colour code (e.g., #0F1C3B)"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColours">{"Accent Colour"}</Label>
                  <div className="relative">
                    <Input
                      id="accentColours"
                      placeholder="#2EC4FF"
                      value={formData.accentColours}
                      onChange={(e) => {
                        const value = e.target.value
                        validateCharLimit("accentColours", value, 50)
                        validateHexColor("accentColours", value)
                        setFormData({ ...formData, accentColours: value })
                      }}
                      required
                      maxLength={50}
                      className="pr-12"
                    />
                    {formData.accentColours && !hexColorErrors.accentColours && (
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: formData.accentColours }}
                      />
                    )}
                  </div>
                  {hexColorErrors.accentColours && (
                    <p className="text-sm text-red-600">{"Please enter a valid hex colour code (e.g., #2EC4FF)"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColour">{"Background Colour"}</Label>
                  <div className="relative">
                    <Input
                      id="backgroundColour"
                      placeholder="#FFFFFF"
                      value={formData.backgroundColour}
                      onChange={(e) => {
                        const value = e.target.value
                        validateCharLimit("backgroundColour", value, 50)
                        validateHexColor("backgroundColour", value)
                        setFormData({ ...formData, backgroundColour: value })
                      }}
                      required
                      maxLength={50}
                      className="pr-12"
                    />
                    {formData.backgroundColour && !hexColorErrors.backgroundColour && (
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: formData.backgroundColour }}
                      />
                    )}
                  </div>
                  {hexColorErrors.backgroundColour && (
                    <p className="text-sm text-red-600">{"Please enter a valid hex colour code (e.g., #FFFFFF)"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentPersonality">{"Agent Personality"}</Label>
                <Select
                  value={formData.agentPersonality}
                  onValueChange={(value) => setFormData({ ...formData, agentPersonality: value })}
                  required
                >
                  <SelectTrigger id="agentPersonality">
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGENT_PERSONALITIES.map((personality) => (
                      <SelectItem key={personality} value={personality}>
                        {personality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {"Choose how your AI assistant will communicate with customers"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{"Booking Settings"}</CardTitle>
              <CardDescription>{"Configure when customers can book appointments"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">{"Business Timezone"}</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                  required
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">{"Event Type"}</Label>
                <Input
                  id="eventType"
                  placeholder="e.g., Discovery Call, Appointment, Viewing"
                  value={formData.eventType}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("eventType", value, 50)
                    setFormData({ ...formData, eventType: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.eventType && <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>}
              </div>

              {/* Calendar Integration dropdown */}
              <div className="space-y-2">
                <Label htmlFor="calendarIntegration">{"Calendar Integration"}</Label>
                <Select
                  value={formData.calendarIntegration}
                  onValueChange={(value) => setFormData({ ...formData, calendarIntegration: value })}
                  required
                >
                  <SelectTrigger id="calendarIntegration">
                    <SelectValue placeholder="Select integration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google Calendar (Direct Integration)">
                      {"Google Calendar (Direct Integration)"}
                    </SelectItem>
                    <SelectItem value="Other">{"Other"}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {
                    "Choose how customers will book with you. Google Calendar enables direct booking via the chatbot. 'Other' shares a booking link instead."
                  }
                </p>
              </div>

              {/* Booking Link field with conditional logic */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`space-y-2 ${isGoogle ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <Label htmlFor="bookingLink" className={isGoogle ? "text-muted-foreground" : ""}>
                      {"Booking Link"}
                    </Label>
                    <Input
                      id="bookingLink"
                      type="url"
                      placeholder="https://..."
                      value={formData.bookingLink}
                      onChange={(e) => {
                        const value = e.target.value
                        setFormData({ ...formData, bookingLink: value })
                        if (value && isOther) {
                          validateUrl(value)
                        } else {
                          setUrlError(false)
                        }
                      }}
                      disabled={isGoogle}
                      required={isOther}
                    />
                    <p className={`text-sm ${isGoogle ? "text-muted-foreground" : "text-muted-foreground"}`}>
                      {"When using 'Other', provide the URL customers should use to book."}
                    </p>
                    {urlError && isOther && (
                      <p className="text-sm text-red-600">{"Please enter a valid booking link."}</p>
                    )}
                  </div>
                </TooltipTrigger>
                {isGoogle && <TooltipContent>{"Disabled when using Google Calendar."}</TooltipContent>}
              </Tooltip>

              {/* Earliest and Latest Booking Time fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`space-y-2 ${isOther ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <Label htmlFor="earliestBookingTime" className={isOther ? "text-muted-foreground" : ""}>
                        {"Earliest Booking Time"}
                      </Label>
                      <Select
                        value={formData.earliestBookingTime}
                        onValueChange={(value) => setFormData({ ...formData, earliestBookingTime: value })}
                        required={isGoogle}
                        disabled={isOther}
                      >
                        <SelectTrigger id="earliestBookingTime">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  {isOther && (
                    <TooltipContent>
                      {
                        "Disabled when using 'Other'. Customers will receive your booking link instead of booking directly."
                      }
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`space-y-2 ${isOther ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <Label htmlFor="latestBookingTime" className={isOther ? "text-muted-foreground" : ""}>
                        {"Latest Booking Time"}
                      </Label>
                      <Select
                        value={formData.latestBookingTime}
                        onValueChange={(value) => setFormData({ ...formData, latestBookingTime: value })}
                        required={isGoogle}
                        disabled={isOther}
                      >
                        <SelectTrigger id="latestBookingTime">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  {isOther && (
                    <TooltipContent>
                      {
                        "Disabled when using 'Other'. Customers will receive your booking link instead of booking directly."
                      }
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>

              {/* Minimum Notice and Maximum Booking Window fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`space-y-2 ${isOther ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <Label htmlFor="minimumNoticeHours" className={isOther ? "text-muted-foreground" : ""}>
                        {"Minimum Notice Time (hours)"}
                      </Label>
                      <Select
                        value={formData.minimumNoticeHours}
                        onValueChange={(value) => setFormData({ ...formData, minimumNoticeHours: value })}
                        required={isGoogle}
                        disabled={isOther}
                      >
                        <SelectTrigger id="minimumNoticeHours">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 49 }, (_, i) => i).map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {`${hour} ${hour === 1 ? "hour" : "hours"}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  {isOther && (
                    <TooltipContent>
                      {
                        "Disabled when using 'Other'. Customers will receive your booking link instead of booking directly."
                      }
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`space-y-2 ${isOther ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <Label htmlFor="maximumBookingDays" className={isOther ? "text-muted-foreground" : ""}>
                        {"Maximum Booking Window (days)"}
                      </Label>
                      <Select
                        value={formData.maximumBookingDays}
                        onValueChange={(value) => setFormData({ ...formData, maximumBookingDays: value })}
                        required={isGoogle}
                        disabled={isOther}
                      >
                        <SelectTrigger id="maximumBookingDays">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 90 }, (_, i) => i + 1).map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {`${day} ${day === 1 ? "day" : "days"}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  {isOther && (
                    <TooltipContent>
                      {
                        "Disabled when using 'Other'. Customers will receive your booking link instead of booking directly."
                      }
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`space-y-3 ${isOther ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <Label className={isOther ? "text-muted-foreground" : ""}>
                      {"Which Days Bookings Can Be Made"}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={selectedDays.includes(day)}
                            onCheckedChange={() => handleDayToggle(day)}
                            required={isGoogle && selectedDays.length === 0}
                            disabled={isOther}
                          />
                          <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipTrigger>
                {isOther && (
                  <TooltipContent>
                    {
                      "Disabled when using 'Other'. Customers will receive your booking link instead of booking directly."
                    }
                  </TooltipContent>
                )}
              </Tooltip>
            </CardContent>
          </Card>

          {/* Services & Messaging */}
          <Card>
            <CardHeader>
              <CardTitle>{"Services & Messaging"}</CardTitle>
              <CardDescription>{"Define your offerings and customer communications"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="servicesOffered">{"Services Offered"}</Label>
                <Textarea
                  id="servicesOffered"
                  placeholder="Provide detailed information about the services you offer"
                  value={formData.servicesOffered}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("servicesOffered", value, 700)
                    setFormData({
                      ...formData,
                      servicesOffered: value,
                    })
                  }}
                  rows={4}
                  required
                  maxLength={700}
                />
                <p className="text-sm text-muted-foreground">{`${formData.servicesOffered.length}/700 characters`}</p>
                {charLimitErrors.servicesOffered && (
                  <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventSummary">{"Event Summary"}</Label>
                <p className="text-sm text-muted-foreground">
                  {"This will be shown in any email invites if applicable and used by the system"}
                </p>
                <Textarea
                  id="eventSummary"
                  placeholder="This message will appear in the customer's calendar invite"
                  value={formData.eventSummary}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("eventSummary", value, 700)
                    setFormData({ ...formData, eventSummary: value })
                  }}
                  rows={3}
                  required
                  maxLength={700}
                />
                <p className="text-sm text-muted-foreground">{`${formData.eventSummary.length}/700 characters`}</p>
                {charLimitErrors.eventSummary && (
                  <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pre-Booking Questions */}
          <Card>
            <CardHeader>
              <CardTitle>{"Pre-Booking Questions"}</CardTitle>
              <CardDescription>
                {"Questions to ask customers before booking (required to submit this form, but optional for customers)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preBookingQuestion1">{"Pre-Booking Question 1"}</Label>
                <Textarea
                  id="preBookingQuestion1"
                  placeholder="Have you ever worked with automation tools before?"
                  value={formData.preBookingQuestion1}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("preBookingQuestion1", value, 700)
                    setFormData({
                      ...formData,
                      preBookingQuestion1: value,
                    })
                  }}
                  rows={2}
                  required
                  maxLength={700}
                />
                <p className="text-sm text-muted-foreground">{`${formData.preBookingQuestion1.length}/700 characters`}</p>
                {charLimitErrors.preBookingQuestion1 && (
                  <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preBookingQuestion2">{"Pre-Booking Question 2"}</Label>
                <Textarea
                  id="preBookingQuestion2"
                  placeholder="What do you aim to achieve by using these chatbot solutions?"
                  value={formData.preBookingQuestion2}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("preBookingQuestion2", value, 700)
                    setFormData({
                      ...formData,
                      preBookingQuestion2: value,
                    })
                  }}
                  rows={2}
                  required
                  maxLength={700}
                />
                <p className="text-sm text-muted-foreground">{`${formData.preBookingQuestion2.length}/700 characters`}</p>
                {charLimitErrors.preBookingQuestion2 && (
                  <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{"Frequently Asked Questions"}</CardTitle>
              <CardDescription>{"Provide common questions and answers about your business (up to 20)"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-muted-foreground">{`FAQ ${index + 1}`}</h4>
                    {faqs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFAQ(faq.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`faq${faq.id}Question`}>{"Question"}</Label>
                    <Input
                      id={`faq${faq.id}Question`}
                      placeholder={`Enter question ${index + 1}`}
                      value={faq.question}
                      onChange={(e) => {
                        const value = e.target.value
                        validateCharLimit(`faq${faq.id}Question`, value, 300)
                        updateFAQ(faq.id, "question", value)
                      }}
                      required
                      maxLength={300}
                    />
                    <p className="text-sm text-muted-foreground">{`${faq.question.length}/300 characters`}</p>
                    {charLimitErrors[`faq${faq.id}Question`] && (
                      <p className="text-sm text-red-600">{"Maximum 300 characters allowed"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`faq${faq.id}Answer`}>{"Answer"}</Label>
                    <Textarea
                      id={`faq${faq.id}Answer`}
                      placeholder={`Enter answer ${index + 1}`}
                      value={faq.answer}
                      onChange={(e) => {
                        const value = e.target.value
                        validateCharLimit(`faq${faq.id}Answer`, value, 300)
                        updateFAQ(faq.id, "answer", value)
                      }}
                      rows={3}
                      required
                      maxLength={300}
                    />
                    <p className="text-sm text-muted-foreground">{`${faq.answer.length}/300 characters`}</p>
                    {charLimitErrors[`faq${faq.id}Answer`] && (
                      <p className="text-sm text-red-600">{"Maximum 300 characters allowed"}</p>
                    )}
                  </div>
                </div>
              ))}

              {faqs.length < 20 && (
                <Button type="button" variant="outline" onClick={addFAQ} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  {"Add FAQ"}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{"Additional Business Details"}</CardTitle>
              <CardDescription>{"Any other information you'd like to provide about your business"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="additionalBusinessDetails">{"Additional Details"}</Label>
                <Textarea
                  id="additionalBusinessDetails"
                  placeholder="Enter any additional information about your business"
                  value={formData.additionalBusinessDetails}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("additionalBusinessDetails", value, 1200)
                    setFormData({ ...formData, additionalBusinessDetails: value })
                  }}
                  rows={4}
                  required
                  maxLength={1200}
                />
                <p className="text-sm text-muted-foreground">
                  {`${formData.additionalBusinessDetails.length}/1200 characters`}
                </p>
                {charLimitErrors.additionalBusinessDetails && (
                  <p className="text-sm text-red-600">{"Maximum 1200 characters allowed"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="min-w-[200px]" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Complete Setup"}
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  )
}
