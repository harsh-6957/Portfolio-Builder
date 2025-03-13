"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focusing on content",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tier: "free"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for artists and designers",
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tier: "free"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design for business professionals",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    tier: "free"
  },
  {
    id: "developer",
    name: "Developer",
    description: "Tech-focused design for developers and engineers",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tier: "premium"
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Visual-focused design for photographers",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tier: "premium"
  },
  {
    id: "writer",
    name: "Writer",
    description: "Text-focused design for writers and authors",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    tier: "premium"
  }
];

export function TemplatesShowcase() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const filteredTemplates = filter === "all" 
    ? templates 
    : templates.filter(template => template.tier === filter);

  return (
    <section className="py-20 bg-muted/50" id="templates">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Beautiful Templates for Every Professional
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose from our collection of professionally designed templates to get started quickly.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="free" onClick={() => setFilter("free")}>Free</TabsTrigger>
              <TabsTrigger value="premium" onClick={() => setFilter("premium")}>Premium</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template, index) => (
            <div key={template.id} className="transition-all duration-300 hover:translate-y-[-5px]">
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                  {template.tier === "premium" && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">Premium</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  <p className="mt-2 text-muted-foreground flex-grow">{template.description}</p>
                  <div className="mt-4">
                    <Link href={`/templates/${template.id}`}>
                      <Button variant="outline" className="w-full">Preview</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/templates">
            <Button size="lg">View All Templates</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}