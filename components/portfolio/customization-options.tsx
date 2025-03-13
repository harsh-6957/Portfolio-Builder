"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CustomizationOptionsProps {
  data: {
    colorScheme: string;
    fontStyle: string;
    spacing: string;
  };
  onUpdate: (data: any) => void;
}

export function CustomizationOptions({ data, onUpdate }: CustomizationOptionsProps) {
  const [activeTab, setActiveTab] = useState("colors");
  const [customization, setCustomization] = useState({
    colorScheme: data.colorScheme || "default",
    fontStyle: data.fontStyle || "sans",
    spacing: data.spacing || "default",
  });
  
  const handleChange = (field: string, value: string) => {
    const updatedData = { ...customization, [field]: value };
    setCustomization(updatedData);
    onUpdate(updatedData);
  };
  
  const colorSchemes = [
    { id: "default", name: "Default", primary: "#000000", secondary: "#ffffff", accent: "#f8f9fa" },
    { id: "blue", name: "Blue", primary: "#1e40af", secondary: "#dbeafe", accent: "#eff6ff" },
    { id: "green", name: "Green", primary: "#15803d", secondary: "#dcfce7", accent: "#f0fdf4" },
    { id: "purple", name: "Purple", primary: "#7e22ce", secondary: "#f3e8ff", accent: "#faf5ff" },
    { id: "orange", name: "Orange", primary: "#c2410c", secondary: "#ffedd5", accent: "#fff7ed" },
    { id: "red", name: "Red", primary: "#b91c1c", secondary: "#fee2e2", accent: "#fef2f2" },
  ];
  
  const fontStyles = [
    { id: "sans", name: "Sans-serif", description: "Clean and modern" },
    { id: "serif", name: "Serif", description: "Traditional and elegant" },
    { id: "mono", name: "Monospace", description: "Technical and precise" },
  ];
  
  const spacingOptions = [
    { id: "compact", name: "Compact", description: "Tighter spacing between elements" },
    { id: "default", name: "Default", description: "Balanced spacing" },
    { id: "spacious", name: "Spacious", description: "More breathing room" },
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Customize Your Portfolio</h2>
      <p className="text-muted-foreground mb-6">
        Personalize the look and feel of your portfolio.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>
        
        <Card className="mt-6">
          <CardContent className="pt-6">
            <TabsContent value="colors" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a color scheme that reflects your personal brand.
                </p>
                
                <RadioGroup
                  value={customization.colorScheme}
                  onValueChange={(value) => handleChange("colorScheme", value)}
                  className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-3"
                >
                  {colorSchemes.map((scheme) => (
                    <div key={scheme.id}>
                      <RadioGroupItem
                        value={scheme.id}
                        id={`color-${scheme.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${scheme.id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="flex gap-2 mb-2">
                          <div
                            className="h-5 w-5 rounded-full border"
                            style={{ backgroundColor: scheme.primary }}
                          />
                          <div
                            className="h-5 w-5 rounded-full border"
                            style={{ backgroundColor: scheme.secondary }}
                          />
                          <div
                            className="h-5 w-5 rounded-full border"
                            style={{ backgroundColor: scheme.accent }}
                          />
                        </div>
                        <span className="text-center">{scheme.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="typography" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Style</h3>
                <p className="text-sm text-muted-foreground">
                  Select a font style that best represents your personality.
                </p>
                
                <RadioGroup
                  value={customization.fontStyle}
                  onValueChange={(value) => handleChange("fontStyle", value)}
                  className="grid gap-4 pt-2"
                >
                  {fontStyles.map((font) => (
                    <div key={font.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={font.id} id={`font-${font.id}`} />
                      <Label htmlFor={`font-${font.id}`} className="flex flex-col">
                        <span className={`text-base font-medium ${font.id === 'sans' ? 'font-sans' : font.id === 'serif' ? 'font-serif' : 'font-mono'}`}>
                          {font.name}
                        </span>
                        <span className="text-sm text-muted-foreground">{font.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Spacing</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust the spacing between elements in your portfolio.
                </p>
                
                <RadioGroup
                  value={customization.spacing}
                  onValueChange={(value) => handleChange("spacing", value)}
                  className="grid gap-4 pt-2"
                >
                  {spacingOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`spacing-${option.id}`} />
                      <Label htmlFor={`spacing-${option.id}`} className="flex flex-col">
                        <span className="text-base font-medium">{option.name}</span>
                        <span className="text-sm text-muted-foreground">{option.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      
      <div className="mt-6">
        <Button onClick={() => onUpdate(customization)}>Save Customization</Button>
      </div>
    </div>
  );
}