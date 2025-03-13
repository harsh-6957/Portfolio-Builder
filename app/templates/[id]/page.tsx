"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ChevronRight, 
  Download, 
  Laptop, 
  Palette, 
  Smartphone, 
  Star, 
  Type, 
  Zap 
} from "lucide-react";
import { MinimalTemplate } from "@/components/portfolio/templates/minimal-template";
import { CreativeTemplate } from "@/components/portfolio/templates/creative-template";
import { ProfessionalTemplate } from "@/components/portfolio/templates/professional-template";
import { DeveloperTemplate } from "@/components/portfolio/templates/developer-template";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { mockTemplates, samplePortfolioData } from "@/lib/mockData";

export default function TemplatePreviewPage() {
  const params = useParams();
  const templateId = params?.id as string;
  const [viewMode, setViewMode] = useState("desktop");
  const [template, setTemplate] = useState<any>(null);
  const [customization, setCustomization] = useState({
    colorScheme: "default",
    fontStyle: "sans",
    spacing: "default",
  });
  
  useEffect(() => {
    // Find the template from mock data
    const foundTemplate = mockTemplates.find(t => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    }
  }, [templateId]);
  
  const renderTemplate = () => {
    switch (templateId) {
      case "minimal":
        return <MinimalTemplate data={samplePortfolioData} customization={customization} />;
      case "creative":
        return <CreativeTemplate data={samplePortfolioData} customization={customization} />;
      case "professional":
        return <ProfessionalTemplate data={samplePortfolioData} customization={customization} />;
      case "developer":
        return <DeveloperTemplate data={samplePortfolioData} customization={customization} />;
      default:
        return <div className="p-8 text-center">Template not found</div>;
    }
  };
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading template...</h2>
          <p className="text-muted-foreground">Please wait while we prepare the preview.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/templates" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Templates</span>
          </Link>
          
          <div className="mx-auto">
            <h1 className="text-lg font-medium flex items-center gap-2">
              {template.name} Template
              {template.tier === "premium" && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1 fill-current" /> Premium
                </Badge>
              )}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="desktop">
                  <Laptop className="mr-2 h-4 w-4" />
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Link href={`/register?template=${templateId}`}>
              <Button className="gap-2">
                Use This Template <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <Card className={`overflow-hidden border-2 ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : "w-full"}`}>
            <div className="bg-secondary h-8 flex items-center px-4 gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive opacity-50"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-50"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 opacity-50"></div>
              <div className="flex-grow text-center text-xs text-muted-foreground">
                {viewMode === "mobile" ? "Mobile Preview" : "Desktop Preview"}
              </div>
            </div>
            
            <div className="bg-background overflow-auto" style={{ height: "calc(100vh - 200px)" }}>
              {renderTemplate()}
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Template Details</h2>
              <p className="text-muted-foreground mb-6">{template.description}</p>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Features</h3>
                <ul className="space-y-2">
                  {template.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Customization</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Palette className="h-4 w-4 text-primary" />
                    </div>
                    <span>Color Schemes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Type className="h-4 w-4 text-primary" />
                    </div>
                    <span>Typography</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span>Animations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Download className="h-4 w-4 text-primary" />
                    </div>
                    <span>Export Options</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-6">
              <Link href={`/register?template=${templateId}`}>
                <Button className="w-full">Use This Template</Button>
              </Link>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="font-medium mb-4">Try Different Styles</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Color Scheme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["default", "blue", "green", "purple", "orange"].map((color) => (
                      <button
                        key={color}
                        className={`h-8 w-8 rounded-full border-2 ${
                          customization.colorScheme === color ? "border-primary" : "border-transparent"
                        }`}
                        style={{ 
                          backgroundColor: 
                            color === "default" ? "#000000" : 
                            color === "blue" ? "#1e40af" : 
                            color === "green" ? "#15803d" : 
                            color === "purple" ? "#7e22ce" : 
                            "#c2410c" 
                        }}
                        onClick={() => setCustomization({ ...customization, colorScheme: color })}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Font Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sans", label: "Sans" },
                      { id: "serif", label: "Serif" },
                      { id: "mono", label: "Mono" }
                    ].map((font) => (
                      <button
                        key={font.id}
                        className={`px-3 py-1.5 rounded border ${
                          customization.fontStyle === font.id 
                            ? "border-primary bg-primary/10" 
                            : "border-border"
                        }`}
                        onClick={() => setCustomization({ ...customization, fontStyle: font.id })}
                      >
                        {font.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Spacing</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "compact", label: "Compact" },
                      { id: "default", label: "Default" },
                      { id: "spacious", label: "Spacious" }
                    ].map((spacing) => (
                      <button
                        key={spacing.id}
                        className={`px-3 py-1.5 rounded border ${
                          customization.spacing === spacing.id 
                            ? "border-primary bg-primary/10" 
                            : "border-border"
                        }`}
                        onClick={() => setCustomization({ ...customization, spacing: spacing.id })}
                      >
                        {spacing.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <section className="bg-muted py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to create your portfolio?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with this template and customize it to showcase your unique skills and projects.
            </p>
            <Link href={`/register?template=${templateId}`}>
              <Button size="lg" className="gap-2">
                Get Started with {template.name} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}