import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Eye, ExternalLink, Code, Palette, Database, BarChart3, Figma, Globe } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Navbar } from "@/components/Navbar";

const skills = [
  { name: "Laravel", icon: Code, color: "from-pastel-pink to-pastel-rose" },
  { name: "PostgreSQL", icon: Database, color: "from-pastel-mint to-pastel-cream" },
  { name: "MySQL", icon: Database, color: "from-pastel-rose to-pastel-pink" },
  { name: "JavaScript", icon: Code, color: "from-pastel-cream to-pastel-mint" },
  { name: "Figma", icon: Figma, color: "from-pastel-pink to-pastel-mint" },
  { name: "Python", icon: Code, color: "from-pastel-mint to-pastel-rose" },
  { name: "Data Analysis", icon: BarChart3, color: "from-pastel-rose to-pastel-cream" },
  { name: "UI/UX Design", icon: Palette, color: "from-pastel-cream to-pastel-pink" },
  { name: "RESTful API", icon: Globe, color: "from-pastel-mint to-pastel-pink" },
];

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const roles = ["UI/UX Designer", "Backend Developer", "Data Analyst"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentRole.length) {
            setTypedText(currentRole.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(currentRole.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex]);

  // Enhanced scroll reveal with stagger support
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-50px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          
          const id = entry.target.id;
          if (id && ["home", "skills", "organizational", "educational", "projects", "contact"].includes(id)) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal, .scroll-reveal-stagger, .slide-in-left, .slide-in-right, section[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      
      <div className="min-h-screen lg:ml-24">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/20 via-pastel-cream to-pastel-mint/20" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="popup-enter mb-8">
            <div className="relative inline-block">
              <img
                src={profilePhoto}
                alt="Tabina Adelia Rafa"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-float mx-auto border-8 border-white"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-card">
                <span className="text-sm font-medium text-foreground">👋 Hello!</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 popup-enter" style={{ animationDelay: "0.2s" }}>
            Tabina Adelia Rafa
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center mb-12">
            <p className="text-xl md:text-3xl font-medium text-muted-foreground">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center popup-enter" style={{ animationDelay: "0.4s" }}>
            <a 
              href="/CV - Tabina Adelia Rafa .pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-base shadow-soft hover-glow flex items-center"
            >
              <Eye className="w-5 h-5 mr-2" />
              View CV
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-10 py-6 text-base border-2 hover:bg-primary/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-transparent via-white/50 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 scroll-reveal">
            ✨ My Skills
          </h2>
          <p className="text-center text-muted-foreground mb-12 scroll-reveal">Technologies & tools I work with</p>
          
          <div className="flex flex-wrap justify-center gap-4 scroll-reveal-stagger">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`skill-badge group flex items-center gap-3 px-6 py-4 bg-gradient-to-br ${skill.color} rounded-2xl shadow-card cursor-default`}
              >
                <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <skill.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-semibold text-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-soft border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-4">
            {[
              { id: "skills", label: "Skills", emoji: "✨" },
              { id: "organizational", label: "Organization", emoji: "📘" },
              { id: "educational", label: "Education", emoji: "📗" },
              { id: "projects", label: "Projects", emoji: "📙" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeSection === tab.id ? "default" : "ghost"}
                onClick={() => scrollToSection(tab.id)}
                className={`rounded-full font-medium transition-all duration-300 ${
                  activeSection === tab.id 
                    ? "bg-primary text-primary-foreground shadow-soft scale-105" 
                    : "hover:bg-primary/20"
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Experience Section */}
      <section id="organizational" className="py-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 scroll-reveal section-title">
            Organizational Experience
          </h2>
          <p className="text-center text-muted-foreground mb-16 scroll-reveal">Leadership & teamwork journey</p>

          <div className="space-y-10">
            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-white border-0 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-pink/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-pink/30 rounded-full text-sm font-medium mb-3">Leadership</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Staff of External Relations</h3>
                    <p className="text-primary font-medium">Informatics Engineering Student Association (HIMATIF)</p>
                    <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                    Feb 2023 – Dec 2024
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Managed and maintained HIMATIF's social media and external website</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Handled communication and inquiries from external parties</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Built and maintained partnerships with media and external organizations</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Led the execution of IFest Unpad to enhance HIMATIF's visibility</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-gradient-to-br from-pastel-mint/10 to-white border-0 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pastel-mint/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-mint/30 rounded-full text-sm font-medium mb-3">Public Relations</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Head of Division Public Relations</h3>
                    <p className="text-primary font-medium">Informatics Festival (IFEST)</p>
                    <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                    Jun 2023 - Oct 2023
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Built and maintained strong relationships with external stakeholders</li>
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Coordinated partnerships with media and sponsors for event success</li>
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Developed communication strategies to enhance public image</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-gradient-to-br from-pastel-rose/10 to-white border-0 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-rose/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-rose/30 rounded-full text-sm font-medium mb-3">Project Management</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Project Supervisor</h3>
                    <p className="text-primary font-medium">Informatics Festival (IFEST) 2024</p>
                    <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                    Jun 2024 - Oct 2024
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Led overall planning and execution of tech event with 500+ participants</li>
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Secured partnerships with 20+ companies and coordinated 12 expert speakers</li>
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Oversaw social media strategy: 685K+ Instagram Reels views, 1.9M+ TikTok views</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Experience Section */}
      <section id="educational" className="py-24 px-4 bg-gradient-to-b from-transparent via-pastel-cream/30 to-transparent overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 scroll-reveal section-title">
            Educational Experience
          </h2>
          <p className="text-center text-muted-foreground mb-16 scroll-reveal">Continuous learning & growth</p>

          <div className="space-y-10">
            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-white border-0 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-mint/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-mint/30 rounded-full text-sm font-medium mb-3">💻 Internship</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Backend Developer</h3>
                    <p className="text-primary font-medium">Bandung Polytechnic of Textile</p>
                    <p className="text-sm text-muted-foreground">Laboratory Inventory Management System</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-mint/20 px-4 py-2 rounded-full">
                    Sep - Nov 2025
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Developed backend logic, database design, and RESTful APIs using Laravel and MySQL</li>
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Collaborated with frontend developers for smooth API integration</li>
                  <li className="flex items-start gap-2"><span className="text-secondary">•</span> Ensured system security and optimized performance</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-gradient-to-br from-pastel-rose/10 to-white border-0 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pastel-rose/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-rose/30 rounded-full text-sm font-medium mb-3">🎨 Internship</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">UI/UX Designer</h3>
                    <p className="text-primary font-medium">FundEx x Rakamin Academy</p>
                    <p className="text-sm text-muted-foreground">Mobile Landing Page Redesign</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-rose/20 px-4 py-2 rounded-full">
                    July 2025
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Redesigned FundEx.id mobile landing page using Design Sprint framework</li>
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Created moodboards, wireframes, mini design system, and prototypes in Figma</li>
                  <li className="flex items-start gap-2"><span className="text-accent">•</span> Enhanced UI/UX with improved information clarity and visual readability</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-gradient-to-br from-pastel-cream/30 to-white border-0 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-pink/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-4 py-1 bg-pastel-cream/50 rounded-full text-sm font-medium mb-3">📊 Course</span>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Data Analytics</h3>
                    <p className="text-primary font-medium">RevoU Mini Course</p>
                    <p className="text-sm text-muted-foreground">Data Analysis & Visualization</p>
                  </div>
                  <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                    Completed ✓
                  </div>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Learned data analysis fundamentals and visualization techniques</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Applied analytical thinking to real-world business problems</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Developed skills in data interpretation and insights presentation</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-transparent via-pastel-pink/10 to-transparent overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 scroll-reveal section-title">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground mb-16 scroll-reveal">What I've been working on</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8 scroll-reveal-stagger">
            {/* Teraz Co-Living */}
            <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-pink/10 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-pastel-pink/20 text-pastel-pink px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse" />
                  Backend Development
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Arzetta Co-Living</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">Laravel 12 • PostgreSQL • RESTful API</p>
                
                <p className="text-foreground/70 mb-6 leading-relaxed line-clamp-4">
                  Building scalable RESTful APIs, structuring clean MVC components, and designing normalized PostgreSQL schemas. 
                  Implementing authentication (JWT/Session), middleware validation, and service layers for business logic.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-soft hover-glow"
                    asChild
                  >
                    <a href="https://github.com/tabinaadeliarafa" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="rounded-full border-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            </Card>

            {/* RajaUang Landing Page */}
            <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-mint/10 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-rose/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-pastel-mint/20 text-pastel-mint px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-pastel-mint rounded-full animate-pulse" />
                  UI/UX Design
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">LKSN RajaUang Redesign</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">September - November 2024</p>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Redesigned landing page for LKSN RajaUang application using Figma. 
                  Created comprehensive design system, wireframes, and high-fidelity prototypes 
                  to enhance user experience and visual appeal.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Figma</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Design System</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Prototyping</span>
                </div>
              </div>
            </Card>

            {/* Huni Bersama Website */}
            <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-rose/10 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-pink/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-pastel-rose/20 text-pastel-rose px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-pastel-rose rounded-full animate-pulse" />
                  UI/UX Design
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Perkumpulan Huni Bersama</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">August - September 2024</p>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Redesigned website for housing community platform. Focused on improving 
                  user flow, accessibility, and creating intuitive navigation with modern aesthetics.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Web Design</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">User Research</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Wireframing</span>
                </div>
              </div>
            </Card>

            {/* HIMAWEB Website */}
            <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-cream/30 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-pastel-cream/40 text-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                  Web Development
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">HIMAWEB Development</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">July 2024</p>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Developed full-stack website for Informatics Student Association. 
                  Implemented responsive design, content management, and interactive features 
                  to showcase organization activities and information.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Full Stack</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Responsive</span>
                  <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">CMS</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Rebound App - Full Width */}
          <Card className="group p-10 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-pink/5 via-white to-pastel-mint/5 border-0 overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pastel-pink/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pastel-pink/20 to-pastel-mint/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Mobile App Development
                </div>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">Rebound Application</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">November 2023 - January 2024</p>
                
                <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                  Developed mobile application to help users track and improve their mental wellness. 
                  Features include mood tracking, journaling, wellness tips, and progress analytics. 
                  Built with modern mobile development practices focusing on UX and performance.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">Mobile Dev</span>
                  <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">UI/UX</span>
                  <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">Wellness</span>
                  <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">Analytics</span>
                </div>
              </div>
              
              <div className="lg:w-48 h-48 flex items-center justify-center">
                <div className="bg-gradient-to-br from-pastel-pink via-pastel-rose to-pastel-mint p-12 rounded-[2rem] shadow-float transform group-hover:rotate-6 transition-transform duration-500">
                  <div className="text-7xl">📱</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-24 px-4 bg-gradient-to-t from-pastel-pink/30 via-pastel-cream/20 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pastel-mint/20 rounded-full blur-3xl animate-floating" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pastel-pink/20 rounded-full blur-3xl animate-floating" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 scroll-reveal section-title">
            Let's Connect
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 scroll-reveal max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center scroll-reveal">
            <a
              href="mailto:tabinaadeliarafa2004@gmail.com"
              className="group flex items-center gap-3 bg-white px-8 py-5 rounded-2xl shadow-card hover-float hover-glow transition-all"
            >
              <div className="w-12 h-12 bg-pastel-pink/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-xs text-muted-foreground block">Email me at</span>
                <span className="font-semibold">tabinaadeliarafa2004@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="flex gap-6 justify-center mt-12 scroll-reveal-stagger">
            <a
              href="https://github.com/tabinaadeliarafa"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-20 h-20 bg-white rounded-2xl flex flex-col items-center justify-center shadow-card skill-badge"
            >
              <Github className="w-8 h-8 mb-1 group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-muted-foreground">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tabinaadeliarafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-20 h-20 bg-white rounded-2xl flex flex-col items-center justify-center shadow-card skill-badge"
            >
              <Linkedin className="w-8 h-8 mb-1 group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-muted-foreground">LinkedIn</span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-border/30 text-sm text-muted-foreground">
            <p>© 2024 Tabina Adelia Rafa • Informatics Engineering, Padjadjaran University</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;
