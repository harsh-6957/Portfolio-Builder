"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const experienceSchema = z.object({
  company: z.string().min(1, { message: "Company name is required." }),
  position: z.string().min(1, { message: "Position is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  location: z.string().optional(),
});

interface ExperienceFormProps {
  experience: any[];
  onUpdate: (experience: any[]) => void;
}

export function ExperienceForm({ experience, onUpdate }: ExperienceFormProps) {
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    },
  });

  const handleAddNew = () => {
    setEditing(null);
    setShowForm(true);
    form.reset({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    });
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setShowForm(true);
    const item = experience[index];
    form.reset({
      company: item.company,
      position: item.position,
      startDate: item.startDate,
      endDate: item.endDate || "",
      current: item.current || false,
      description: item.description || "",
      location: item.location || "",
    });
  };

  const handleDelete = (index: number) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    onUpdate(newExperience);
    if (editing === index) {
      setEditing(null);
      setShowForm(false);
      form.reset({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        location: "",
      });
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    form.reset({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    });
  };

  function onSubmit(values: z.infer<typeof experienceSchema>) {
    const newExperience = [...experience];
    
    if (editing !== null) {
      newExperience[editing] = values;
    } else {
      newExperience.push(values);
    }
    
    onUpdate(newExperience);
    setEditing(null);
    setShowForm(false);
    form.reset({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <p className="text-muted-foreground">
            Add your professional experience to showcase your career path.
          </p>
        </div>
        <Button onClick={handleAddNew} variant={showForm ? "outline" : "default"}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      
      {experience.length > 0 && (
        <div className="space-y-4 mb-6">
          {experience.map((item, index) => (
            <Card key={index} className={editing === index ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium">
                    {item.position}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.company}
                    {item.location && (
                      <span> • {item.location}</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    {item.startDate} - {item.current ? "Present" : item.endDate}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              {item.description && (
                <CardContent className="pt-2">
                  <p className="text-sm">{item.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {showForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Company Name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jan 2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I currently work here
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {!form.watch("current") && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mar 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your responsibilities and achievements..." 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Highlight your key responsibilities, achievements, and skills used in this role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button type="submit">
                {editing !== null ? "Update Experience" : "Add Experience"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}