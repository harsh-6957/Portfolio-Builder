"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Paintbrush, Save } from "lucide-react";

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface ColorPickerProps {
  value: ColorScheme;
  onChange: (colors: ColorScheme) => void;
  onSave?: (name: string, colors: ColorScheme) => void;
}

const presetSchemes = [
  {
    name: "Classic",
    colors: { primary: "#000000", secondary: "#ffffff", accent: "#0ea5e9" }
  },
  {
    name: "Forest",
    colors: { primary: "#166534", secondary: "#f0fdf4", accent: "#84cc16" }
  },
  {
    name: "Ocean",
    colors: { primary: "#0369a1", secondary: "#f0f9ff", accent: "#06b6d4" }
  },
  {
    name: "Sunset",
    colors: { primary: "#9a3412", secondary: "#fff7ed", accent: "#f59e0b" }
  },
  {
    name: "Royal",
    colors: { primary: "#581c87", secondary: "#faf5ff", accent: "#c084fc" }
  }
];

export function ColorPicker({ value, onChange, onSave }: ColorPickerProps) {
  const [colors, setColors] = useState<ColorScheme>(value);
  const [activeTab, setActiveTab] = useState("picker");
  const [schemeName, setSchemeName] = useState("");

  useEffect(() => {
    setColors(value);
  }, [value]);

  const handleColorChange = (key: keyof ColorScheme, color: string) => {
    const newColors = { ...colors, [key]: color };
    setColors(newColors);
    onChange(newColors);
  };

  const handlePresetSelect = (preset: ColorScheme) => {
    setColors(preset);
    onChange(preset);
  };

  const handleSave = () => {
    if (onSave && schemeName) {
      onSave(schemeName, colors);
      setSchemeName("");
    }
  };

  const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="picker">
              <Paintbrush className="h-4 w-4 mr-2" />
              Color Picker
            </TabsTrigger>
            <TabsTrigger value="presets">
              <div className="flex items-center">
                <div className="flex -space-x-1 mr-2">
                  {presetSchemes.slice(0, 3).map((scheme, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: scheme.colors.primary }}
                    />
                  ))}
                </div>
                Presets
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="picker" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2 mt-1.5">
                  <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <Input
                    type="text"
                    value={colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className={!isValidColor(colors.primary) ? 'border-red-500' : ''}
                  />
                  <Input
                    type="color"
                    value={colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-10 p-0 border-0"
                  />
                </div>
              </div>

              <div>
                <Label>Secondary Color</Label>
                <div className="flex gap-2 mt-1.5">
                  <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <Input
                    type="text"
                    value={colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className={!isValidColor(colors.secondary) ? 'border-red-500' : ''}
                  />
                  <Input
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-10 p-0 border-0"
                  />
                </div>
              </div>

              <div>
                <Label>Accent Color</Label>
                <div className="flex gap-2 mt-1.5">
                  <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <Input
                    type="text"
                    value={colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className={!isValidColor(colors.accent) ? 'border-red-500' : ''}
                  />
                  <Input
                    type="color"
                    value={colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-10 p-0 border-0"
                  />
                </div>
              </div>

              {onSave && (
                <div className="pt-4 border-t">
                  <Label>Save Color Scheme</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      placeholder="Scheme name"
                      value={schemeName}
                      onChange={(e) => setSchemeName(e.target.value)}
                    />
                    <Button onClick={handleSave} disabled={!schemeName}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="presets" className="mt-4">
            <div className="grid gap-3">
              {presetSchemes.map((scheme, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(scheme.colors)}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: scheme.colors.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: scheme.colors.secondary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: scheme.colors.accent }}
                      />
                    </div>
                    <span className="font-medium">{scheme.name}</span>
                  </div>
                  {JSON.stringify(colors) === JSON.stringify(scheme.colors) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}