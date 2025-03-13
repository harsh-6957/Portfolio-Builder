"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, Calendar, ExternalLink, Briefcase, GraduationCap, Code } from "lucide-react";

interface ProfessionalTemplateProps {
  data: any;
  customization: {
    colorScheme: string;
    fontStyle: string;
    spacing: string;
  };
}

export function ProfessionalTemplate({ data, customization }: ProfessionalTemplateProps) {
  const fontClass = 
    customization.fontStyle === "serif" 
      ? "font-serif" 
      : customization.fontStyle === "mono" 
        ? "font-mono" 
        : "font-sans";
  
  const spacingClass = 
    customization.spacing === "compact" 
      ? "space-y-6" 
      : customization.spacing === "spacious" 
        ? "space-y-14" 
        : "space-y-10";
  
  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
      <header className="bg-primary text-primary-foreground">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ffffff1a,transparent)]"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="h-32 w-32 border-4 border-primary-foreground/20">
                {data.avatar ? (
                  <AvatarImage src={data.avatar} alt={data.name} />
                ) : (
                  <AvatarImage src="/placeholder-user.jpg" alt={data.name} />
                )}
                <AvatarFallback>{data.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-grow">
                <h1 className="text-4xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
                <p className="mt-2 text-xl opacity-90">{data.title || "Your Professional Title"}</p>
                
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                  {data.email && (
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {data.email}
                    </Button>
                  )}
                  {data.phone && (
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      {data.phone}
                    </Button>
                  )}
                  {data.location && (
                    <Button variant="secondary" size="sm" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      {data.location}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex md:flex-col gap-2">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.website && (
                  <a href={data.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
            
            {data.bio && (
              <div className="mt-8 max-w-3xl mx-auto">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="p-6">
                    <p className="text-primary-foreground/80 text-center leading-relaxed">{data.bio}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className={`max-w-5xl mx-auto px-4 md:px-8 py-12 ${spacingClass}`}>
        {data.experience && data.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <CardTitle>{exp.position}</CardTitle>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
                        <Calendar className="h-3 w-3 mr-1" />
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                  </CardHeader>
                  {exp.description && (
                    <CardContent>
                      <p className="text-sm leading-relaxed">{exp.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {data.education && data.education.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {data.education.map((edu: any, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <CardTitle>{edu.degree} in {edu.field}</CardTitle>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </CardHeader>
                  {edu.description && (
                    <CardContent>
                      <p className="text-sm leading-relaxed">{edu.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {data.skills && data.skills.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Skills & Expertise</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {data.skills.map((skill: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.projects.map((project: any, index: number) => (
                <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {project.imageUrl && (
                    <div className="h-48 w-full relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardHeader className={project.imageUrl ? "-mt-12 relative z-10" : ""}>
                    <CardTitle className={project.imageUrl ? "text-white" : ""}>
                      {project.title}
                    </CardTitle>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <Badge key={i} variant="outline" className={`text-xs ${project.imageUrl ? "text-white border-white/20" : ""}`}>
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-muted py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {data.name || "Your Name"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}