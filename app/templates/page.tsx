"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Eye, Star } from "lucide-react";
import { mockTemplates } from "@/lib/mockData";

export default function TemplatesPage() {
  const [filter, setFilter] = useState("all");

  const filteredTemplates = filter === "all" 
    ? mockTemplates 
    : mockTemplates.filter(template => template.tier === filter);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">PortfolioBuilder</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Find Your Perfect Portfolio Template
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from our collection of professionally designed templates to showcase your work beautifully.
            </p>
          </div>
        </div>
      </div>
      
      <main className="container -mt-10">
        <div className="mb-8 flex justify-center">
          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All Templates</TabsTrigger>
              <TabsTrigger value="free" onClick={() => setFilter("free")}>Free</TabsTrigger>
              <TabsTrigger value="premium" onClick={() => setFilter("premium")}>Premium</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {template.tier === "premium" && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1 fill-current" /> Premium
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <Link href={`/templates/${template.id}`} className="w-full">
                    <Button variant="secondary" className="w-full gap-2">
                      <Eye className="h-4 w-4" /> Preview Template
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  {template.tier === "free" && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Free
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                
                <div className="mt-auto">
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <ul className="space-y-1 mb-4">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-4">
                    <Link href={`/templates/${template.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">Preview</Button>
                    </Link>
                    <Link href={`/register?template=${template.id}`} className="flex-1">
                      <Button className="w-full">Use Template</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <section className="bg-muted py-16 mt-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to create your portfolio?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose a template, customize it to your liking, and showcase your work to the world.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Get Started Now <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="border-t bg-background">
        <div className="container py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}