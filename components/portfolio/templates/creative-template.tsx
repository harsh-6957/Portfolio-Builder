"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, Calendar, ExternalLink } from "lucide-react";

interface CreativeTemplateProps {
  data: any;
  customization: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    container: {
      layout: string;
      padding: number;
      margin: number;
      borderRadius: number;
      shadowSize: number;
      animation: string;
      background: string;
      hoverEffect: string;
    };
    projects: {
      cardSize: number;
      displayFormat: string;
      showThumbnails: boolean;
      enableFiltering: boolean;
      enableSorting: boolean;
      timelineLayout: boolean;
      showLogos: boolean;
      expandableDescriptions: boolean;
      showSkillIcons: boolean;
    };
    experience: {
      cardSize: number;
      displayFormat: string;
      showThumbnails: boolean;
      enableFiltering: boolean;
      enableSorting: boolean;
      timelineLayout: boolean;
      showLogos: boolean;
      expandableDescriptions: boolean;
      showSkillIcons: boolean;
    };
  };
}

export function CreativeTemplate({ data, customization }: CreativeTemplateProps) {
  // Create CSS variables for custom colors
  const colorStyles = {
    '--custom-primary': customization.colors.primary,
    '--custom-secondary': customization.colors.secondary,
    '--custom-accent': customization.colors.accent,
  } as React.CSSProperties;

  // Generate dynamic styles based on customization
  const containerStyle = {
    padding: `${customization.container.padding}px`,
    margin: `${customization.container.margin}px`,
    borderRadius: `${customization.container.borderRadius}px`,
    boxShadow: customization.container.shadowSize > 0 ? `0 ${customization.container.shadowSize}px ${customization.container.shadowSize * 2}px rgba(0,0,0,0.1)` : 'none',
  };

  // Generate animation classes based on customization
  const getAnimationClass = () => {
    switch (customization.container.animation) {
      case 'fade':
        return 'animate-in fade-in duration-500';
      case 'slide':
        return 'animate-in slide-in-from-bottom-5 duration-500';
      case 'scale':
        return 'animate-in zoom-in duration-500';
      default:
        return '';
    }
  };

  // Generate hover effect classes based on customization
  const getHoverClass = () => {
    switch (customization.container.hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-1 hover:shadow-lg';
      case 'glow':
        return 'hover:shadow-[0_0_15px_rgba(var(--custom-accent),0.3)]';
      case 'scale':
        return 'hover:scale-[1.02]';
      case 'border':
        return 'hover:border-[var(--custom-accent)]';
      default:
        return '';
    }
  };

  // Generate background pattern based on customization
  const getBackgroundPattern = () => {
    switch (customization.container.background) {
      case 'dots':
        return 'bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]';
      case 'lines':
        return 'bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.05)_75%)] bg-[length:20px_20px]';
      case 'grid':
        return 'bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background" style={colorStyles}>
      <div className="relative">
        <div className="absolute inset-0 bg-[var(--custom-primary)] opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--custom-accent)_10%,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-100px,var(--custom-accent)_10%,transparent_80%)]"></div>
        <div className={`absolute inset-0 ${getBackgroundPattern()}`}></div>
        
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-20" style={containerStyle}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--custom-primary)] via-[var(--custom-accent)] to-[var(--custom-primary)]/20 blur"></div>
              <Avatar className="h-40 w-40 border-4 border-background relative">
                {data.avatar ? (
                  <AvatarImage src={data.avatar} alt={data.name} />
                ) : (
                  <AvatarImage src="/placeholder-user.jpg" alt={data.name} />
                )}
                <AvatarFallback>{data.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--custom-accent)]/10 text-[var(--custom-accent)] mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--custom-accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--custom-accent)]"></span>
                </span>
                Available for opportunities
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[var(--custom-primary)] via-[var(--custom-accent)] to-[var(--custom-primary)]/50 text-transparent bg-clip-text">
                {data.name || "Your Name"}
              </h1>
              <p className="mt-2 text-xl text-muted-foreground">{data.title || "Your Professional Title"}</p>
              
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                {data.email && (
                  <Button variant="outline" size="sm" className="gap-2 rounded-full bg-background/50 backdrop-blur-sm border-[var(--custom-accent)]/20 hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                    <Mail className="h-4 w-4" />
                    {data.email}
                  </Button>
                )}
                {data.phone && (
                  <Button variant="outline" size="sm" className="gap-2 rounded-full bg-background/50 backdrop-blur-sm border-[var(--custom-accent)]/20 hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                    <Phone className="h-4 w-4" />
                    {data.phone}
                  </Button>
                )}
                {data.location && (
                  <Button variant="outline" size="sm" className="gap-2 rounded-full bg-background/50 backdrop-blur-sm border-[var(--custom-accent)]/20 hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                    <MapPin className="h-4 w-4" />
                    {data.location}
                  </Button>
                )}
              </div>
              
              <div className="mt-4 flex justify-center md:justify-start gap-2">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.website && (
                  <a href={data.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)]">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {data.bio && (
            <div className="mt-12 max-w-3xl mx-auto">
              <Card className={`overflow-hidden bg-background/50 backdrop-blur-sm border-[var(--custom-accent)]/20 ${getAnimationClass()}`}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center leading-relaxed">{data.bio}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <main className={`max-w-5xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 gap-12`}>
        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section className={getAnimationClass()}>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="h-8 w-1 bg-[var(--custom-accent)] rounded-full"></span>
              Featured Projects
            </h2>
            <div className={`grid gap-8 ${
              customization.projects.displayFormat === 'grid' ? 'md:grid-cols-2' : ''
            }`}>
              {data.projects.map((project: any, index: number) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden group transition-all duration-300 border-[var(--custom-accent)]/20 ${getHoverClass()}`}
                >
                  {customization.projects.showThumbnails && project.imageUrl && (
                    <div className="h-48 w-full relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardHeader className={project.imageUrl && customization.projects.showThumbnails ? "-mt-12 relative z-10" : ""}>
                    <CardTitle className={project.imageUrl && customization.projects.showThumbnails ? "text-white" : ""}>
                      {project.title}
                    </CardTitle>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className={`text-xs ${
                              project.imageUrl && customization.projects.showThumbnails 
                                ? "text-white border-white/20" 
                                : "border-[var(--custom-accent)]/20"
                            }`}
                          >
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
                          className="text-xs text-[var(--custom-accent)] hover:underline flex items-center"
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
                          className="text-xs text-[var(--custom-accent)] hover:underline flex items-center"
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

        {/* Experience and Education Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <section className={getAnimationClass()}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="h-8 w-1 bg-[var(--custom-accent)] rounded-full"></span>
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp: any, index: number) => (
                  <Card 
                    key={index} 
                    className={`overflow-hidden group transition-all duration-300 border-[var(--custom-accent)]/20 ${getHoverClass()}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{exp.position}</CardTitle>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
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

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <section className={getAnimationClass()}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="h-8 w-1 bg-[var(--custom-accent)] rounded-full"></span>
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu: any, index: number) => (
                  <Card 
                    key={index} 
                    className={`overflow-hidden group transition-all duration-300 border-[var(--custom-accent)]/20 ${getHoverClass()}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{edu.degree} in {edu.field}</CardTitle>
                          <p className="text-muted-foreground">{edu.institution}</p>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
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
        </div>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className={getAnimationClass()}>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="h-8 w-1 bg-[var(--custom-accent)] rounded-full"></span>
              Skills & Technologies
            </h2>
            <Card className={`overflow-hidden border-[var(--custom-accent)]/20 ${getHoverClass()}`}>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-4 py-2 text-sm rounded-full hover:bg-[var(--custom-accent)]/10 hover:text-[var(--custom-accent)] transition-colors cursor-default border-[var(--custom-accent)]/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}