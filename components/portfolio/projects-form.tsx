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
import { Code, ExternalLink, Github, Plus, Trash2 } from "lucide-react";

const projectSchema = z.object({
  title: z.string().min(1, { message: "Project title is required." }),
  description: z.string().min(1, { message: "Project description is required." }),
  technologies: z.string().optional(),
  liveUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  repoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

interface ProjectsFormProps {
  projects: any[];
  onUpdate: (projects: any[]) => void;
}

export function ProjectsForm({ projects, onUpdate }: ProjectsFormProps) {
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
    },
  });

  const handleAddNew = () => {
    setEditing(null);
    setShowForm(true);
    form.reset({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
    });
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setShowForm(true);
    const item = projects[index];
    form.reset({
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      liveUrl: item.liveUrl || "",
      repoUrl: item.repoUrl || "",
      imageUrl: item.imageUrl || "",
    });
  };

  const handleDelete = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onUpdate(newProjects);
    if (editing === index) {
      setEditing(null);
      setShowForm(false);
      form.reset({
        title: "",
        description: "",
        technologies: "",
        liveUrl: "",
        repoUrl: "",
        imageUrl: "",
      });
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    form.reset({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
    });
  };

  function onSubmit(values: z.infer<typeof projectSchema>) {
    const newProjects = [...projects];
    
    if (editing !== null) {
      newProjects[editing] = values;
    } else {
      newProjects.push(values);
    }
    
    onUpdate(newProjects);
    setEditing(null);
    setShowForm(false);
    form.reset({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-muted-foreground">
            Showcase your best work and projects to demonstrate your skills.
          </p>
        </div>
        <Button onClick={handleAddNew} variant={showForm ? "outline" : "default"}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      
      {projects.length > 0 && (
        <div className="space-y-4 mb-6">
          {projects.map((item, index) => (
            <Card key={index} className={editing === index ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium">
                    {item.title}
                  </CardTitle>
                  {item.technologies && (
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Code className="mr-1 h-3 w-3" />
                      {item.technologies}
                    </div>
                  )}
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
              <CardContent className="pt-2">
                <p className="text-sm">{item.description}</p>
                
                {(item.liveUrl || item.repoUrl) && (
                  <div className="flex gap-4 mt-4">
                    {item.liveUrl && (
                      <a 
                        href={item.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Live Demo
                      </a>
                    )}
                    {item.repoUrl && (
                      <a 
                        href={item.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-primary hover:underline"
                      >
                        <Github className="mr-1 h-3 w-3" />
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {showForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., E-commerce Website" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your project..." 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Explain what the project does, your role, and any notable features or challenges.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js, MongoDB" {...field} />
                  </FormControl>
                  <FormDescription>
                    List the main technologies, languages, or tools used in this project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo URL (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="https://myproject.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="https://github.com/username/repo" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a screenshot or image that represents your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button type="submit">
                {editing !== null ? "Update Project" : "Add Project"}
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