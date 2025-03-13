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
import { GraduationCap, Calendar, Plus, Trash2 } from "lucide-react";

const educationSchema = z.object({
  institution: z.string().min(1, { message: "Institution name is required." }),
  degree: z.string().min(1, { message: "Degree is required." }),
  field: z.string().min(1, { message: "Field of study is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().min(1, { message: "End date is required." }),
  description: z.string().optional(),
  location: z.string().optional(),
});

interface EducationFormProps {
  education: any[];
  onUpdate: (education: any[]) => void;
}

export function EducationForm({ education, onUpdate }: EducationFormProps) {
  const [editing, setEditing] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    },
  });

  const handleAddNew = () => {
    setEditing(null);
    form.reset({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    });
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    const item = education[index];
    form.reset({
      institution: item.institution,
      degree: item.degree,
      field: item.field,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
      location: item.location,
    });
  };

  const handleDelete = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onUpdate(newEducation);
    if (editing === index) {
      setEditing(null);
      form.reset({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
        location: "",
      });
    }
  };

  function onSubmit(values: z.infer<typeof educationSchema>) {
    const newEducation = [...education];
    
    if (editing !== null) {
      newEducation[editing] = values;
    } else {
      newEducation.push(values);
    }
    
    onUpdate(newEducation);
    setEditing(null);
    form.reset({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Education</h2>
          <p className="text-muted-foreground">
            Add your educational background to showcase your qualifications.
          </p>
        </div>
        <Button onClick={handleAddNew} variant={editing !== null ? "outline" : "default"}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>
      
      {education.length > 0 && (
        <div className="space-y-4 mb-6">
          {education.map((item, index) => (
            <Card key={index} className={editing === index ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium">
                    {item.degree} in {item.field}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.institution}
                    {item.location && (
                      <span>, {item.location}</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    {item.startDate} - {item.endDate}
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
      
      {(editing !== null || education.length === 0) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="University or School Name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science" {...field} />
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
                      <Input placeholder="e.g., Sep 2016" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jun 2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cambridge, MA" {...field} />
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
                      placeholder="Describe your studies, achievements, or activities..." 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include relevant coursework, honors, activities, or other notable achievements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button type="submit">
                {editing !== null ? "Update Education" : "Add Education"}
              </Button>
              {editing !== null && (
                <Button type="button" variant="outline" onClick={handleAddNew}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}