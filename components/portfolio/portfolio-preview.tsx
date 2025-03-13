"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Laptop, Maximize2, Minimize2, Smartphone } from "lucide-react";
import { MinimalTemplate } from "@/components/portfolio/templates/minimal-template";
import { CreativeTemplate } from "@/components/portfolio/templates/creative-template";
import { ProfessionalTemplate } from "@/components/portfolio/templates/professional-template";
import { DeveloperTemplate } from "@/components/portfolio/templates/developer-template";
import { HostingModal } from "@/components/portfolio/hosting-modal";
import { cn } from "@/lib/utils";

interface PortfolioPreviewProps {
  template: string;
  data: any;
  customization: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    container: {
      layout: string;
      padding: number;
      margin: number;
      borderRadius: number;
      shadowSize: number;
      animation: string;
      background: string;
      hoverEffect: string;
    };
    projects: {
      cardSize: number;
      displayFormat: string;
      showThumbnails: boolean;
      enableFiltering: boolean;
      enableSorting: boolean;
      timelineLayout: boolean;
      showLogos: boolean;
      expandableDescriptions: boolean;
      showSkillIcons: boolean;
    };
    experience: {
      cardSize: number;
      displayFormat: string;
      showThumbnails: boolean;
      enableFiltering: boolean;
      enableSorting: boolean;
      timelineLayout: boolean;
      showLogos: boolean;
      expandableDescriptions: boolean;
      showSkillIcons: boolean;
    };
  };
}

export function PortfolioPreview({ template, data, customization }: PortfolioPreviewProps) {
  const [viewMode, setViewMode] = useState("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const [showHostingModal, setShowHostingModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Force re-render when customization changes
  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [customization]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  const renderTemplate = () => {
    const templateProps = {
      data,
      customization
    };

    switch (template) {
      case "minimal":
        return <MinimalTemplate key={previewKey} {...templateProps} />;
      case "creative":
        return <CreativeTemplate key={previewKey} {...templateProps} />;
      case "professional":
        return <ProfessionalTemplate key={previewKey} {...templateProps} />;
      case "developer":
        return <DeveloperTemplate key={previewKey} {...templateProps} />;
      default:
        return <div className="p-8 text-center">Template not found</div>;
    }
  };

  const PreviewContent = () => (
    <div className="bg-background overflow-auto" style={{ height: isFullscreen ? "100vh" : "calc(100vh - 300px)" }}>
      {renderTemplate()}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="absolute top-4 right-4 z-50 flex items-center gap-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
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
          <Button variant="outline" size="icon" onClick={() => setIsFullscreen(false)}>
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className={cn(
          "h-full w-full transition-all duration-300",
          viewMode === "mobile" && "max-w-[375px] mx-auto"
        )}>
          <PreviewContent />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Preview Your Portfolio</h2>
          <p className="text-muted-foreground">
            See how your portfolio will look to visitors.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="outline" size="icon" onClick={() => setIsFullscreen(true)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className={`overflow-hidden border-2 ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : "w-full"}`}>
        <div className="bg-secondary h-8 flex items-center px-4 gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive opacity-50"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-50"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 opacity-50"></div>
          <div className="flex-grow text-center text-xs text-muted-foreground">
            {viewMode === "mobile" ? "Mobile Preview" : "Desktop Preview"}
          </div>
        </div>

        <PreviewContent />
      </Card>

      <div className="mt-6 flex justify-center">
        <Button onClick={() => setShowHostingModal(true)}>
          Create Portfolio
        </Button>
      </div>

      <HostingModal 
        open={showHostingModal} 
        onOpenChange={setShowHostingModal}
      />
    </div>
  );
}