"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function OmniarcCustomizationForm() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    websiteDomain: "",
    businessLocation: "",
    businessIndustry: "",
    businessType: "",
    businessDescription: "",
    logoUrl: "",
    brandColours: "",
    accentColours: "",
    backgroundColour: "",
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
    faq1Question: "",
    faq1Answer: "",
    faq2Question: "",
    faq2Answer: "",
    faq3Question: "",
    faq3Answer: "",
    faq4Question: "",
    faq4Answer: "",
    faq5Question: "",
    faq5Answer: "",
    faq6Question: "",
    faq6Answer: "",
    faq7Question: "",
    faq7Answer: "",
    faq8Question: "",
    faq8Answer: "",
    faq9Question: "",
    faq9Answer: "",
    faq10Question: "",
    faq10Answer: "",
    additionalBusinessDetails: "",
  })

  const [charLimitErrors, setCharLimitErrors] = useState<Record<string, boolean>>({})

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const payload = {
        ...formData,
        bookingDays: selectedDays,
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
      setFormData({
        businessName: "",
        email: "",
        phone: "",
        websiteDomain: "",
        businessLocation: "",
        businessIndustry: "",
        businessType: "",
        businessDescription: "",
        logoUrl: "",
        brandColours: "",
        accentColours: "",
        backgroundColour: "",
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
        faq1Question: "",
        faq1Answer: "",
        faq2Question: "",
        faq2Answer: "",
        faq3Question: "",
        faq3Answer: "",
        faq4Question: "",
        faq4Answer: "",
        faq5Question: "",
        faq5Answer: "",
        faq6Question: "",
        faq6Answer: "",
        faq7Question: "",
        faq7Answer: "",
        faq8Question: "",
        faq8Answer: "",
        faq9Question: "",
        faq9Answer: "",
        faq10Question: "",
        faq10Answer: "",
        additionalBusinessDetails: "",
      })
      setSelectedDays([])
      setCharLimitErrors({})
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fffd9ef72068badb734955/f9934892f_Omniarclogo.png"
            alt="Omniarc Logo"
            className="h-12 w-auto"
          />
        </div>
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
                <Label htmlFor="email">{"Email Address"}</Label>
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
                <Label htmlFor="phone">{"Phone Number"}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+61 4XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
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
                <Label htmlFor="brandColours">{"Brand Colours"}</Label>
                <Input
                  id="brandColours"
                  placeholder="#1a2332"
                  value={formData.brandColours}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("brandColours", value, 50)
                    setFormData({ ...formData, brandColours: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.brandColours && (
                  <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColours">{"Accent Colours"}</Label>
                <Input
                  id="accentColours"
                  placeholder="#5DBBDB"
                  value={formData.accentColours}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("accentColours", value, 50)
                    setFormData({ ...formData, accentColours: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.accentColours && (
                  <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColour">{"Background Colour"}</Label>
                <Input
                  id="backgroundColour"
                  placeholder="#FFFFFF"
                  value={formData.backgroundColour}
                  onChange={(e) => {
                    const value = e.target.value
                    validateCharLimit("backgroundColour", value, 50)
                    setFormData({ ...formData, backgroundColour: value })
                  }}
                  required
                  maxLength={50}
                />
                {charLimitErrors.backgroundColour && (
                  <p className="text-sm text-red-600">{"Maximum 50 characters allowed"}</p>
                )}
              </div>
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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="earliestBookingTime">{"Earliest Booking Time"}</Label>
                <Select
                  value={formData.earliestBookingTime}
                  onValueChange={(value) => setFormData({ ...formData, earliestBookingTime: value })}
                  required
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

              <div className="space-y-2">
                <Label htmlFor="latestBookingTime">{"Latest Booking Time"}</Label>
                <Select
                  value={formData.latestBookingTime}
                  onValueChange={(value) => setFormData({ ...formData, latestBookingTime: value })}
                  required
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
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minimumNoticeHours">{"Minimum Notice Time (hours)"}</Label>
                <Select
                  value={formData.minimumNoticeHours}
                  onValueChange={(value) => setFormData({ ...formData, minimumNoticeHours: value })}
                  required
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

              <div className="space-y-2">
                <Label htmlFor="maximumBookingDays">{"Maximum Booking Window (days)"}</Label>
                <Select
                  value={formData.maximumBookingDays}
                  onValueChange={(value) => setFormData({ ...formData, maximumBookingDays: value })}
                  required
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
            </div>

            <div className="space-y-3">
              <Label>{"Which Days Bookings Can Be Made"}</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                      required={selectedDays.length === 0}
                    />
                    <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
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
            <CardDescription>{"Provide 10 common questions and answers about your business"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div key={num} className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium text-sm text-muted-foreground">{`FAQ ${num}`}</h4>
                <div className="space-y-2">
                  <Label htmlFor={`faq${num}Question`}>{"Question"}</Label>
                  <Input
                    id={`faq${num}Question`}
                    placeholder={`Enter question ${num}`}
                    value={formData[`faq${num}Question` as keyof typeof formData]}
                    onChange={(e) => {
                      const value = e.target.value
                      validateCharLimit(`faq${num}Question`, value, 300)
                      setFormData({ ...formData, [`faq${num}Question`]: value })
                    }}
                    required
                    maxLength={300}
                  />
                  <p className="text-sm text-muted-foreground">
                    {`${(formData[`faq${num}Question` as keyof typeof formData] as string).length}/300 characters`}
                  </p>
                  {charLimitErrors[`faq${num}Question`] && (
                    <p className="text-sm text-red-600">{"Maximum 300 characters allowed"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`faq${num}Answer`}>{"Answer"}</Label>
                  <Textarea
                    id={`faq${num}Answer`}
                    placeholder={`Enter answer ${num}`}
                    value={formData[`faq${num}Answer` as keyof typeof formData]}
                    onChange={(e) => {
                      const value = e.target.value
                      validateCharLimit(`faq${num}Answer`, value, 300)
                      setFormData({ ...formData, [`faq${num}Answer`]: value })
                    }}
                    rows={3}
                    required
                    maxLength={300}
                  />
                  <p className="text-sm text-muted-foreground">
                    {`${(formData[`faq${num}Answer` as keyof typeof formData] as string).length}/300 characters`}
                  </p>
                  {charLimitErrors[`faq${num}Answer`] && (
                    <p className="text-sm text-red-600">{"Maximum 300 characters allowed"}</p>
                  )}
                </div>
              </div>
            ))}
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
                  validateCharLimit("additionalBusinessDetails", value, 700)
                  setFormData({ ...formData, additionalBusinessDetails: value })
                }}
                rows={4}
                required
                maxLength={700}
              />
              <p className="text-sm text-muted-foreground">
                {`${formData.additionalBusinessDetails.length}/700 characters`}
              </p>
              {charLimitErrors.additionalBusinessDetails && (
                <p className="text-sm text-red-600">{"Maximum 700 characters allowed"}</p>
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
  )
}
