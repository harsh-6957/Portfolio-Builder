// Types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Portfolio {
  id: string;
  name: string;
  slug: string;
  template: string;
  published: boolean;
  userId: string;
  createdAt: string;
  lastUpdated: string;
  url: string;
  views: number;
  uniqueVisitors: number;
  data: PortfolioData;
  customization: Customization;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  coverImage?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
}

export interface Customization {
  colorScheme: string;
  fontStyle: string;
  spacing: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  tier: 'free' | 'premium';
  features: string[];
}

// Sample portfolio data for previews
export const samplePortfolioData: PortfolioData = {
  name: "John Smith",
  title: "Full Stack Developer",
  bio: "Passionate developer with over 5 years of experience building modern web applications. Specializing in React, Node.js, and cloud technologies.",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  socialLinks: {
    linkedin: "https://linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    twitter: "https://twitter.com/johnsmith",
    website: "https://johnsmith.dev"
  },
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      startDate: "Jan 2021",
      current: true,
      description: "Lead developer for enterprise web applications, mentoring junior developers, and implementing best practices.",
      location: "San Francisco, CA"
    },
    {
      company: "Web Innovations",
      position: "Frontend Developer",
      startDate: "Mar 2019",
      endDate: "Dec 2020",
      current: false,
      description: "Developed responsive web applications using React and Redux.",
      location: "Portland, OR"
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "Sep 2015",
      endDate: "Jun 2019",
      description: "Graduated with honors. Specialized in web technologies and software engineering.",
      location: "Boston, MA"
    }
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "PostgreSQL",
    "MongoDB"
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      technologies: "React, Node.js, MongoDB, Stripe",
      liveUrl: "https://example-ecommerce.com",
      repoUrl: "https://github.com/johnsmith/ecommerce",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      technologies: "React, Firebase, Material-UI",
      liveUrl: "https://example-tasks.com",
      repoUrl: "https://github.com/johnsmith/task-app",
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    }
  ]
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "user",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "user",
    createdAt: "2024-02-01T15:30:00Z"
  }
];

// Mock Templates
export const mockTemplates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focusing on content",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    tier: "free",
    features: [
      "Clean typography",
      "Content-focused layout",
      "Responsive design",
      "Customizable sections"
    ]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for artists and designers",
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tier: "free",
    features: [
      "Vibrant color schemes",
      "Dynamic layouts",
      "Portfolio gallery",
      "Animation effects"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design for business professionals",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    tier: "free",
    features: [
      "Business-oriented layout",
      "Testimonial section",
      "Contact form",
      "Professional color palette"
    ]
  },
  {
    id: "developer",
    name: "Developer",
    description: "Tech-focused design for developers and engineers",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tier: "premium",
    features: [
      "Code snippet display",
      "GitHub integration",
      "Skills visualization",
      "Project showcase"
    ]
  }
];

// Mock Portfolios
export const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    name: "Professional Portfolio",
    slug: "john-doe-portfolio",
    template: "minimal",
    published: true,
    userId: "1",
    createdAt: "2024-02-15T10:00:00Z",
    lastUpdated: "2024-03-10T15:30:00Z",
    url: "john-doe.portfoliobuilder.com",
    views: 1248,
    uniqueVisitors: 845,
    data: {
      name: "John Doe",
      title: "Full Stack Developer",
      bio: "Passionate developer with over 5 years of experience building web applications. I specialize in React, Node.js, and modern JavaScript frameworks.",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        website: "https://johndoe.com"
      },
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Senior Developer",
          startDate: "Jan 2020",
          current: true,
          description: "Lead developer for client projects, mentoring junior developers, and implementing best practices.",
          location: "San Francisco, CA"
        },
        {
          company: "Web Innovations",
          position: "Frontend Developer",
          startDate: "Mar 2018",
          endDate: "Dec 2019",
          current: false,
          description: "Developed responsive web applications using React and Redux.",
          location: "Portland, OR"
        }
      ],
      education: [
        {
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "Sep 2014",
          endDate: "Jun 2018",
          description: "Graduated with honors. Specialized in web technologies and software engineering.",
          location: "Boston, MA"
        }
      ],
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "HTML/CSS",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "AWS",
        "Docker"
      ],
      projects: [
        {
          title: "E-commerce Platform",
          description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
          technologies: "React, Node.js, MongoDB, Stripe",
          liveUrl: "https://example-ecommerce.com",
          repoUrl: "https://github.com/johndoe/ecommerce",
          imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
        },
        {
          title: "Task Management App",
          description: "A collaborative task management application with real-time updates and team features.",
          technologies: "React, Firebase, Material-UI",
          liveUrl: "https://example-tasks.com",
          repoUrl: "https://github.com/johndoe/task-app",
          imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
        }
      ]
    },
    customization: {
      colorScheme: "default",
      fontStyle: "sans",
      spacing: "default"
    }
  }
];

// Mock Analytics Data
export const mockAnalytics = {
  views: {
    total: 1248,
    trend: 12, // Percentage increase from last month
    monthly: [
      { month: "Jan", value: 450 },
      { month: "Feb", value: 520 },
      { month: "Mar", value: 610 },
      { month: "Apr", value: 780 },
      { month: "May", value: 850 },
      { month: "Jun", value: 1100 },
      { month: "Jul", value: 1248 }
    ]
  },
  visitors: {
    total: 845,
    trend: 8, // Percentage increase from last month
    monthly: [
      { month: "Jan", value: 320 },
      { month: "Feb", value: 380 },
      { month: "Mar", value: 440 },
      { month: "Apr", value: 560 },
      { month: "May", value: 620 },
      { month: "Jun", value: 780 },
      { month: "Jul", value: 845 }
    ]
  },
  locations: [
    { country: "United States", count: 450 },
    { country: "United Kingdom", count: 120 },
    { country: "Canada", count: 95 },
    { country: "Germany", count: 85 },
    { country: "France", count: 65 }
  ],
  devices: [
    { type: "Desktop", percentage: 65 },
    { type: "Mobile", percentage: 30 },
    { type: "Tablet", percentage: 5 }
  ],
  sources: [
    { name: "Direct", value: 40 },
    { name: "Search", value: 30 },
    { name: "Social", value: 20 },
    { name: "Referral", value: 10 }
  ]
};

// Mock Authentication Functions
export const mockAuth = {
  // Simulated login function
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    
    // For mock data, accept any password for existing mock users
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    return user;
  },
  
  // Simulated registration function
  register: async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error("Email already exists");
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      role: "user",
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    return newUser;
  }
};

// Mock Portfolio Functions
export const mockPortfolioActions = {
  // Create new portfolio
  create: async (userId: string, data: Partial<Portfolio>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPortfolio: Portfolio = {
      id: String(mockPortfolios.length + 1),
      name: data.name || "Untitled Portfolio",
      slug: `portfolio-${Date.now()}`,
      template: data.template || "minimal",
      published: false,
      userId,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      url: `${data.slug || `portfolio-${Date.now()}`}.portfoliobuilder.com`,
      views: 0,
      uniqueVisitors: 0,
      data: data.data || {
        name: "",
        title: "",
        bio: "",
        email: "",
        socialLinks: {},
        experience: [],
        education: [],
        skills: [],
        projects: []
      },
      customization: data.customization || {
        colorScheme: "default",
        fontStyle: "sans",
        spacing: "default"
      }
    };
    
    mockPortfolios.push(newPortfolio);
    return newPortfolio;
  },
  
  // Update portfolio
  update: async (id: string, data: Partial<Portfolio>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockPortfolios.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Portfolio not found");
    
    mockPortfolios[index] = {
      ...mockPortfolios[index],
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    return mockPortfolios[index];
  },
  
  // Delete portfolio
  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockPortfolios.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Portfolio not found");
    
    mockPortfolios.splice(index, 1);
  },
  
  // Publish/Unpublish portfolio
  togglePublish: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const portfolio = mockPortfolios.find(p => p.id === id);
    if (!portfolio) throw new Error("Portfolio not found");
    
    portfolio.published = !portfolio.published;
    portfolio.lastUpdated = new Date().toISOString();
    
    return portfolio;
  }
};