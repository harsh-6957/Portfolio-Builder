"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "./color-picker";
import { ContainerControls } from "./container-controls";
import { SectionControls } from "./section-controls";
import { Palette, BoxSelect, LayoutGrid, Briefcase } from "lucide-react";

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface ContainerStyle {
  layout: 'grid' | 'list' | 'cards' | 'timeline' | 'masonry';
  padding: number;
  margin: number;
  borderRadius: number;
  shadowSize: number;
  animation: string;
  background: string;
  hoverEffect: string;
}

interface SectionStyle {
  cardSize: number;
  displayFormat: 'grid' | 'slider' | 'showcase';
  showThumbnails: boolean;
  enableFiltering: boolean;
  enableSorting: boolean;
  timelineLayout: boolean;
  showLogos: boolean;
  expandableDescriptions: boolean;
  showSkillIcons: boolean;
}

interface CustomizationPanelProps {
  initialCustomization?: {
    colors: ColorScheme;
    container: ContainerStyle;
    projects: SectionStyle;
    experience: SectionStyle;
  };
  onUpdate: (customization: {
    colors: ColorScheme;
    container: ContainerStyle;
    projects: SectionStyle;
    experience: SectionStyle;
  }) => void;
}

const defaultCustomization = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#0ea5e9"
  },
  container: {
    layout: 'grid' as const,
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
    displayFormat: 'grid' as const,
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
    displayFormat: 'grid' as const,
    showThumbnails: false,
    enableFiltering: false,
    enableSorting: false,
    timelineLayout: true,
    showLogos: true,
    expandableDescriptions: true,
    showSkillIcons: true
  }
};

export function CustomizationPanel({ initialCustomization, onUpdate }: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("colors");
  const [customization, setCustomization] = useState(initialCustomization || defaultCustomization);

  // Initialize with initial customization when provided
  useEffect(() => {
    if (initialCustomization) {
      setCustomization(initialCustomization);
    }
  }, [initialCustomization]);

  const handleUpdate = <K extends keyof typeof customization>(
    key: K,
    value: typeof customization[K]
  ) => {
    const newCustomization = { ...customization, [key]: value };
    setCustomization(newCustomization);
    onUpdate(newCustomization);
  };

  const handleReset = () => {
    setCustomization(defaultCustomization);
    onUpdate(defaultCustomization);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="container">
            <BoxSelect className="h-4 w-4 mr-2" />
            Container
          </TabsTrigger>
          <TabsTrigger value="projects">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="experience">
            <Briefcase className="h-4 w-4 mr-2" />
            Experience
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="colors">
            <ColorPicker
              value={customization.colors}
              onChange={(colors) => handleUpdate('colors', colors)}
            />
          </TabsContent>

          <TabsContent value="container">
            <ContainerControls
              value={customization.container}
              onChange={(container) => handleUpdate('container', container)}
            />
          </TabsContent>

          <TabsContent value="projects">
            <SectionControls
              section="projects"
              value={customization.projects}
              onChange={(projects) => handleUpdate('projects', projects)}
            />
          </TabsContent>

          <TabsContent value="experience">
            <SectionControls
              section="experience"
              value={customization.experience}
              onChange={(experience) => handleUpdate('experience', experience)}
            />
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
