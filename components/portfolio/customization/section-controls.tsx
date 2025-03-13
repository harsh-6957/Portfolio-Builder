"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Image as ImageIcon, SlidersHorizontal, Filter, Building2, Timer, XIcon as Icons } from "lucide-react";

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

interface SectionControlsProps {
  section: 'projects' | 'experience';
  value: SectionStyle;
  onChange: (style: SectionStyle) => void;
}

const displayFormatOptions = [
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'slider', label: 'Slider', icon: SlidersHorizontal },
  { id: 'showcase', label: 'Showcase', icon: ImageIcon },
];

export function SectionControls({ section, value, onChange }: SectionControlsProps) {
  const [activeTab, setActiveTab] = useState("layout");

  const handleChange = (key: keyof SectionStyle, newValue: any) => {
    onChange({ ...value, [key]: newValue });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="layout">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="features">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="mt-4 space-y-6">
            {section === 'projects' && (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Card Size</Label>
                    <span className="text-sm text-muted-foreground">{value.cardSize}px</span>
                  </div>
                  <Slider
                    value={[value.cardSize]}
                    min={200}
                    max={400}
                    step={20}
                    onValueChange={([val]) => handleChange('cardSize', val)}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Display Format</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {displayFormatOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleChange('displayFormat', option.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                            value.displayFormat === option.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {section === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Timeline Layout</Label>
                    <div className="text-sm text-muted-foreground">
                      Display experience as an interactive timeline
                    </div>
                  </div>
                  <Switch
                    checked={value.timelineLayout}
                    onCheckedChange={(checked) => handleChange('timelineLayout', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Company Logos</Label>
                    <div className="text-sm text-muted-foreground">
                      Show company logos in experience cards
                    </div>
                  </div>
                  <Switch
                    checked={value.showLogos}
                    onCheckedChange={(checked) => handleChange('showLogos', checked)}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="features" className="mt-4 space-y-4">
            {section === 'projects' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Project Thumbnails</Label>
                    <div className="text-sm text-muted-foreground">
                      Display project preview images
                    </div>
                  </div>
                  <Switch
                    checked={value.showThumbnails}
                    onCheckedChange={(checked) => handleChange('showThumbnails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Filtering</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable project filtering by tags
                    </div>
                  </div>
                  <Switch
                    checked={value.enableFiltering}
                    onCheckedChange={(checked) => handleChange('enableFiltering', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sorting</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable project sorting options
                    </div>
                  </div>
                  <Switch
                    checked={value.enableSorting}
                    onCheckedChange={(checked) => handleChange('enableSorting', checked)}
                  />
                </div>
              </>
            )}

            {section === 'experience' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Expandable Descriptions</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow expanding job descriptions
                    </div>
                  </div>
                  <Switch
                    checked={value.expandableDescriptions}
                    onCheckedChange={(checked) => handleChange('expandableDescriptions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Skill Icons</Label>
                    <div className="text-sm text-muted-foreground">
                      Show icons for skills and tools used
                    </div>
                  </div>
                  <Switch
                    checked={value.showSkillIcons}
                    onCheckedChange={(checked) => handleChange('showSkillIcons', checked)}
                  />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}