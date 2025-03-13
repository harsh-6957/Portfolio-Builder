"use client";

import { useEffect, useState } from "react";
import { 
  Palette, 
  Layout, 
  Globe, 
  BarChart3, 
  Smartphone, 
  Save, 
  CheckCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Layout className="h-10 w-10 text-primary" />,
    title: "Professional Templates",
    description: "Choose from a variety of professionally designed templates to showcase your work."
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Custom Styling",
    description: "Personalize your portfolio with custom colors, fonts, and layouts."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Custom Domain",
    description: "Use your own domain for a professional touch with our premium plan."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Analytics Dashboard",
    description: "Track visitors and engagement on your portfolio with detailed analytics."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Responsive Design",
    description: "Your portfolio looks great on all devices, from desktop to mobile."
  },
  {
    icon: <Save className="h-10 w-10 text-primary" />,
    title: "Auto-Save",
    description: "Never lose your work with automatic saving as you edit your portfolio."
  }
];

// Custom DragDropIcon component since it's not in lucide-react
function DragDropIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
  );
}

export function FeaturesSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-20" id="features">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Build Your Portfolio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform provides all the tools you need to create a stunning portfolio website.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="transition-all duration-300 hover:translate-y-[-5px]">
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}