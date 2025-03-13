"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { TemplateSelector } from "@/components/portfolio/template-selector";
import { PersonalInfoForm } from "@/components/portfolio/personal-info-form";
import { CustomizationPanel } from "@/components/portfolio/customization/customization-panel";
import { PortfolioPreview } from "@/components/portfolio/portfolio-preview";
import { mockTemplates } from "@/lib/mockData";

const steps = [
  { id: "template", label: "Choose Template" },
  { id: "info", label: "Personal Info" },
  { id: "customize", label: "Customize" },
  { id: "preview", label: "Preview" },
];

const defaultCustomization = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#0ea5e9"
  },
  container: {
    layout: 'grid',
    padding: 24,
    margin: 16,
    borderRadius: 8,
    shadowSize: 8,
    animation: 'fade',
    background: 'none',
    hoverEffect: 'lift'
  },
  projects: {
    cardSize: 300,
    displayFormat: 'grid',
    showThumbnails: true,
    enableFiltering: true,
    enableSorting: true,
    timelineLayout: false,
    showLogos: false,
    expandableDescriptions: false,
    showSkillIcons: false
  },
  experience: {
    cardSize: 300,
    displayFormat: 'grid',
    showThumbnails: false,
    enableFiltering: false,
    enableSorting: false,
    timelineLayout: true,
    showLogos: true,
    expandableDescriptions: true,
    showSkillIcons: true
  }
};

export default function CreatePortfolioPage() {
  const [currentStep, setCurrentStep] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [customization, setCustomization] = useState(defaultCustomization);

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleInfoUpdate = (data: any) => {
    setPortfolioData(data);
  };

  const handleCustomizationUpdate = (data: any) => {
    setCustomization(data);
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Portfolio</h1>
          <p className="text-muted-foreground mt-1">Build your professional portfolio in minutes</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ 
                width: `${(steps.findIndex(step => step.id === currentStep) + 1) * 25}%` 
              }}
            ></div>
          </div>
          
          <Tabs value={currentStep} className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-4">
              {steps.map((step) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  disabled={
                    (step.id === "info" && !selectedTemplate) ||
                    (step.id === "customize" && (!selectedTemplate || !portfolioData.name)) ||
                    (step.id === "preview" && (!selectedTemplate || !portfolioData.name))
                  }
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <Card className="mt-6 border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <TabsContent value="template" className="mt-0">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate} 
                    onSelect={handleTemplateSelect} 
                    templates={mockTemplates}
                  />
                </TabsContent>
                
                <TabsContent value="info" className="mt-0">
                  <PersonalInfoForm 
                    data={portfolioData} 
                    onUpdate={handleInfoUpdate} 
                  />
                </TabsContent>
                
                <TabsContent value="customize" className="mt-0">
                  <CustomizationPanel 
                    initialCustomization={customization}
                    onUpdate={handleCustomizationUpdate}
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-0">
                  <PortfolioPreview 
                    template={selectedTemplate}
                    data={portfolioData}
                    customization={customization}
                  />
                </TabsContent>
              </CardContent>
            </Card>
            
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === steps[0].id}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              {currentStep === steps[steps.length - 1].id ? (
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Create Portfolio
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === "template" && !selectedTemplate) ||
                    (currentStep === "info" && !portfolioData.name)
                  }
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  );
}