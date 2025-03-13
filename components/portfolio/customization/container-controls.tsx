"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutGrid,
  LayoutList,
  LayoutPanelTop,
  Timer,
  Grid2X2,
  BoxSelect,
  Move3D,
  Palette,
} from "lucide-react";

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

interface ContainerControlsProps {
  value: ContainerStyle;
  onChange: (style: ContainerStyle) => void;
}

const layoutOptions = [
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'list', label: 'List', icon: LayoutList },
  { id: 'cards', label: 'Cards', icon: LayoutPanelTop },
  { id: 'timeline', label: 'Timeline', icon: Timer },
  { id: 'masonry', label: 'Masonry', icon: Grid2X2 },
];

const animationOptions = [
  { id: 'none', label: 'None' },
  { id: 'fade', label: 'Fade' },
  { id: 'slide', label: 'Slide' },
  { id: 'scale', label: 'Scale' },
  { id: 'bounce', label: 'Bounce' },
];

const backgroundOptions = [
  { id: 'none', label: 'None' },
  { id: 'dots', label: 'Dots' },
  { id: 'lines', label: 'Lines' },
  { id: 'grid', label: 'Grid' },
  { id: 'waves', label: 'Waves' },
];

const hoverEffectOptions = [
  { id: 'none', label: 'None' },
  { id: 'lift', label: 'Lift' },
  { id: 'glow', label: 'Glow' },
  { id: 'scale', label: 'Scale' },
  { id: 'border', label: 'Border' },
];

export function ContainerControls({ value, onChange }: ContainerControlsProps) {
  const [activeTab, setActiveTab] = useState("layout");

  const handleChange = (key: keyof ContainerStyle, newValue: any) => {
    onChange({ ...value, [key]: newValue });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="layout">
              <BoxSelect className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="spacing">
              <Move3D className="h-4 w-4 mr-2" />
              Spacing
            </TabsTrigger>
            <TabsTrigger value="effects">
              <Palette className="h-4 w-4 mr-2" />
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {layoutOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleChange('layout', option.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                      value.layout === option.id
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
          </TabsContent>

          <TabsContent value="spacing" className="mt-4 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Padding</Label>
                <span className="text-sm text-muted-foreground">{value.padding}px</span>
              </div>
              <Slider
                value={[value.padding]}
                min={0}
                max={48}
                step={4}
                onValueChange={([val]) => handleChange('padding', val)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Margin</Label>
                <span className="text-sm text-muted-foreground">{value.margin}px</span>
              </div>
              <Slider
                value={[value.margin]}
                min={0}
                max={48}
                step={4}
                onValueChange={([val]) => handleChange('margin', val)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Border Radius</Label>
                <span className="text-sm text-muted-foreground">{value.borderRadius}px</span>
              </div>
              <Slider
                value={[value.borderRadius]}
                min={0}
                max={24}
                step={2}
                onValueChange={([val]) => handleChange('borderRadius', val)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Shadow Size</Label>
                <span className="text-sm text-muted-foreground">{value.shadowSize}px</span>
              </div>
              <Slider
                value={[value.shadowSize]}
                min={0}
                max={32}
                step={4}
                onValueChange={([val]) => handleChange('shadowSize', val)}
              />
            </div>
          </TabsContent>

          <TabsContent value="effects" className="mt-4 space-y-6">
            <div>
              <Label>Animation</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {animationOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={value.animation === option.id ? "default" : "outline"}
                    onClick={() => handleChange('animation', option.id)}
                    className="h-auto py-2"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Background Pattern</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {backgroundOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={value.background === option.id ? "default" : "outline"}
                    onClick={() => handleChange('background', option.id)}
                    className="h-auto py-2"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Hover Effect</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {hoverEffectOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={value.hoverEffect === option.id ? "default" : "outline"}
                    onClick={() => handleChange('hoverEffect', option.id)}
                    className="h-auto py-2"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}