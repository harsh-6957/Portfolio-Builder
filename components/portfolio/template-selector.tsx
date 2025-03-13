"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
  templates: any[];
}

export function TemplateSelector({ selectedTemplate, onSelect, templates }: TemplateSelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <p className="text-muted-foreground mb-6">
        Select a template that best represents your professional style.
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={cn(
              "cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary/50 relative",
              selectedTemplate === template.id ? "ring-2 ring-primary" : ""
            )}
            onClick={() => onSelect(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              {template.tier === "premium" && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" /> Premium
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              
              <div className="mt-3">
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Features:</h4>
                <ul className="text-xs text-muted-foreground">
                  {template.features.slice(0, 2).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-3 w-3 mr-1 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}