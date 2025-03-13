"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface SkillsFormProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}

export function SkillsForm({ skills, onUpdate }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onUpdate([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Skills & Expertise</h2>
        <p className="text-muted-foreground">
          Add your technical skills, tools, and areas of expertise.
        </p>
      </div>
      
      <div className="flex gap-2 mb-6">
        <div className="flex-grow">
          <Input
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleAddSkill} type="button">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {skills.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </button>
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No skills added yet. Add your first skill above.</p>
        </div>
      )}
    </div>
  );
}