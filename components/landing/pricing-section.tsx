"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function PricingSection() {
  const [mounted, setMounted] = useState(false);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: "$0", annually: "$0" },
      features: [
        { name: "3 Basic Templates", included: true },
        { name: "Limited Customization", included: true },
        { name: "Subdomain Hosting", included: true },
        { name: "All Templates", included: false },
        { name: "Custom Domain Support", included: false },
        { name: "Analytics Dashboard", included: false },
        { name: "SEO Tools", included: false },
      ],
      cta: "Get Started",
      ctaLink: "/register",
      popular: false,
    },
    {
      name: "Premium",
      description: "For professionals who need more",
      price: { monthly: "$12", annually: "$99" },
      features: [
        { name: "3 Basic Templates", included: true },
        { name: "Full Customization", included: true },
        { name: "Subdomain Hosting", included: true },
        { name: "All Templates", included: true },
        { name: "Custom Domain Support", included: true },
        { name: "Analytics Dashboard", included: true },
        { name: "SEO Tools", included: true },
      ],
      cta: "Upgrade Now",
      ctaLink: "/register?plan=premium",
      popular: true,
    }
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that's right for you and start building your portfolio today.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Label htmlFor="billing-toggle" className={!annual ? "font-medium" : "text-muted-foreground"}>Monthly</Label>
          <Switch
            id="billing-toggle"
            checked={annual}
            onCheckedChange={setAnnual}
          />
          <Label htmlFor="billing-toggle" className={annual ? "font-medium" : "text-muted-foreground"}>
            Annual <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Save 30%</span>
          </Label>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan, index) => (
            <div key={plan.name} className="flex transition-all duration-300 hover:translate-y-[-5px]">
              <Card className={`flex flex-col w-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{annual ? plan.price.annually : plan.price.monthly}</span>
                    {plan.name !== "Free" && (
                      <span className="text-muted-foreground ml-1">{annual ? "/year" : "/month"}</span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-5 w-5 text-primary" />
                        ) : (
                          <X className="mr-2 h-5 w-5 text-muted-foreground" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={plan.ctaLink} className="w-full">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}