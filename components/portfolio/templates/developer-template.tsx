"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, Calendar, ExternalLink, Terminal, Code, Briefcase, GraduationCap } from "lucide-react";

interface DeveloperTemplateProps {
  data: any;
  customization: {
    colorScheme: string;
    fontStyle: string;
    spacing: string;
  };
}

export function DeveloperTemplate({ data, customization }: DeveloperTemplateProps) {
  const fontClass = 
    customization.fontStyle === "serif" 
      ? "font-serif" 
      : customization.fontStyle === "mono" 
        ? "font-mono" 
        : "font-sans";
  
  const spacingClass = 
    customization.spacing === "compact" 
      ? "gap-6" 
      : customization.spacing === "spacious" 
        ? "gap-14" 
        : "gap-10";
  
  return (
    <div className={`min-h-screen bg-black text-white ${fontClass}`}>
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#00ffff12,transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-100px,#ff00ff12,transparent)]"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur"></div>
              <Avatar className="h-40 w-40 border-4 border-black relative">
                {data.avatar ? (
                  <AvatarImage src={data.avatar} alt={data.name} />
                ) : (
                  <AvatarImage src="/placeholder-user.jpg" alt={data.name} />
                )}
                <AvatarFallback>{data.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <Terminal className="h-4 w-4" />
                <code className="text-sm">developer@portfolio:~$</code>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                {data.name || "Your Name"}
              </h1>
              <p className="mt-2 text-xl text-white/80">{data.title || "Your Professional Title"}</p>
              
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                {data.email && (
                  <Button variant="outline" size="sm" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20">
                    <Mail className="h-4 w-4" />
                    {data.email}
                  </Button>
                )}
                {data.location && (
                  <Button variant="outline" size="sm" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20">
                    <MapPin className="h-4 w-4" />
                    {data.location}
                  </Button>
                )}
              </div>
              
              <div className="mt-4 flex justify-center md:justify-start gap-2">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </a>
                )}
                {data.socialLinks?.website && (
                  <a href={data.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
            
            {data.skills && data.skills.length > 0 && (
              <div className="md:ml-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="flex flex-wrap gap-2 max-w-xs">
                    {data.skills.slice(0, 8).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white/10 border-white/20">
                        {skill}
                      </Badge>
                    ))}
                    {data.skills.length > 8 && (
                      <Badge variant="outline" className="bg-white/10 border-white/20">
                        +{data.skills.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {data.bio && (
            <div className="mt-12 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <p className="text-white/80 text-center leading-relaxed">{data.bio}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <main className={`max-w-5xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 ${spacingClass}`}>
        {data.projects && data.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/10 p-2 rounded-lg">
                <Terminal className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {data.projects.map((project: any, index: number) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  {project.imageUrl && (
                    <div className="h-48 w-full relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  <CardHeader className={project.imageUrl ? "-mt-12 relative z-10" : ""}>
                    <CardTitle className="text-white">
                      {project.title}
                    </CardTitle>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs bg-white/10 border-white/20">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/80 mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center transition-colors"
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
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center transition-colors"
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
        
        <div className="grid gap-8 md:grid-cols-2">
          {data.experience && data.experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {data.experience.map((exp: any, index: number) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{exp.position}</CardTitle>
                          <p className="text-white/60">{exp.company}</p>
                        </div>
                        <div className="text-sm text-white/60 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                    </CardHeader>
                    {exp.description && (
                      <CardContent>
                        <p className="text-sm text-white/80 leading-relaxed">{exp.description}</p>
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
                <div className="bg-white/10 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                {data.education.map((edu: any, index: number) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{edu.degree} in {edu.field}</CardTitle>
                          <p className="text-white/60">{edu.institution}</p>
                        </div>
                        <div className="text-sm text-white/60 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </div>
                    </CardHeader>
                    {edu.description && (
                      <CardContent>
                        <p className="text-sm text-white/80 leading-relaxed">{edu.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {data.skills && data.skills.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/10 p-2 rounded-lg">
                <Code className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Skills & Technologies</h2>
            </div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {data.skills.map((skill: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:scale-125 transition-transform"></div>
                      <span className="text-white/80 group-hover:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      
      <footer className="border-t border-white/10 py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} {data.name || "Your Name"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}