import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const roles = ["UI/UX Designer", "Backend Developer", "Data Analyst"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
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

          <div className="h-12 md:h-16 flex items-center justify-center mb-8">
            <p className="text-xl md:text-2xl font-medium text-muted-foreground">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center popup-enter" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-soft hover-glow"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-8 border-2 hover:bg-primary/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-4">
            {[
              { id: "organizational", label: "Organizational Experience" },
              { id: "educational", label: "Educational Experience" },
              { id: "projects", label: "Projects" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => scrollToSection(tab.id)}
                className="rounded-full hover:bg-primary/20 hover:text-primary-foreground font-medium"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Experience Section */}
      <section id="organizational" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 scroll-reveal">
            📘 Organizational Experience
          </h2>

          <div className="space-y-8">
            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Staff of External Relations</h3>
                  <p className="text-primary font-medium">Informatics Engineering Student Association (HIMATIF)</p>
                  <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  February 2023 – December 2024
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Managed and maintained HIMATIF's social media and external website</li>
                <li>• Handled communication and inquiries from external parties</li>
                <li>• Built and maintained partnerships with media and external organizations</li>
                <li>• Led the execution of IFest Unpad to enhance HIMATIF's visibility</li>
                <li>• Supervised Project Officers with direction and support</li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-pink/10 to-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Head of Division Public Relations</h3>
                  <p className="text-primary font-medium">Informatics Festival (IFEST)</p>
                  <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  June 2023 - October 2023
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Built and maintained strong relationships with external stakeholders</li>
                <li>• Coordinated partnerships with media and sponsors for event success</li>
                <li>• Developed communication strategies to enhance public image</li>
                <li>• Ensured consistent branding and positive representation of IFEST</li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-mint/10 to-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Project Supervisor</h3>
                  <p className="text-primary font-medium">Informatics Festival (IFEST) 2024</p>
                  <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  June 2024 - October 2024
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Led overall planning and execution of tech event with 500+ participants</li>
                <li>• Managed timeline, budgeting, and ensured project efficiency</li>
                <li>• Secured partnerships with 20+ companies and coordinated 12 expert speakers</li>
                <li>• Oversaw social media strategy: 685K+ Instagram Reels views, 1.9M+ TikTok views</li>
                <li>• Fostered cross-functional collaboration for event success</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Experience Section */}
      <section id="educational" className="py-20 px-4 bg-gradient-to-b from-transparent to-pastel-cream/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 scroll-reveal">
            📗 Educational Experience
          </h2>

          <div className="space-y-8">
            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Backend Developer - Internship</h3>
                  <p className="text-primary font-medium">Bandung Polytechnic of Textile</p>
                  <p className="text-sm text-muted-foreground">Laboratory Inventory Management System</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  September 2025 - November 2025
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Developed backend logic, database design, and RESTful APIs using Laravel and MySQL</li>
                <li>• Collaborated with frontend developers for smooth API integration</li>
                <li>• Ensured system security and optimized performance</li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-rose/10 to-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">UI/UX Designer - Project Based Internship</h3>
                  <p className="text-primary font-medium">FundEx x Rakamin Academy</p>
                  <p className="text-sm text-muted-foreground">Mobile Landing Page Redesign</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  July 2025
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Redesigned FundEx.id mobile landing page using Design Sprint framework</li>
                <li>• Created moodboards, wireframes, mini design system, and prototypes in Figma</li>
                <li>• Enhanced UI/UX with improved information clarity and visual readability</li>
                <li>• Developed modern, consistent, and user-friendly interface</li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8 rounded-2xl shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-mint/10 to-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Data Analytics - Mini Course</h3>
                  <p className="text-primary font-medium">RevoU</p>
                  <p className="text-sm text-muted-foreground">Data Analysis & Visualization</p>
                </div>
                <div className="text-sm md:text-right text-muted-foreground">
                  Completed
                </div>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li>• Learned data analysis fundamentals and visualization techniques</li>
                <li>• Applied analytical thinking to real-world business problems</li>
                <li>• Developed skills in data interpretation and insights presentation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 scroll-reveal">
            📙 Projects
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <Card className="p-8 md:p-10 rounded-2xl shadow-float hover-float scroll-reveal bg-gradient-to-br from-white via-pastel-pink/5 to-pastel-mint/5">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Backend Development
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Teraz Co-Living</h3>
                  <p className="text-sm text-muted-foreground mb-4">Backend Developer – Laravel 12</p>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    As backend developers using Laravel 12, including building scalable RESTful APIs, 
                    structuring clean MVC components, and designing normalized PostgreSQL schemas. 
                    Tasks include optimizing complex queries, managing database migrations, implementing 
                    authentication and authorization (JWT/Session), creating middleware for request validation, 
                    and developing service layers for business logic. Also involved in API versioning, 
                    error handling, caching strategies, and integrating data analytics pipelines to process 
                    occupancy and performance metrics.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      className="bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-soft hover-glow"
                      asChild
                    >
                      <a href="https://github.com/tabinaadeliarafa" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View GitHub Repository
                      </a>
                    </Button>
                    <Button 
                      variant="outline"
                      className="rounded-full border-2"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project Demo
                    </Button>
                  </div>
                </div>

                <div className="lg:w-64 flex items-center justify-center">
                  <div className="bg-gradient-to-br from-pastel-pink to-pastel-mint p-8 rounded-2xl shadow-card">
                    <div className="text-6xl">🏢</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-16 px-4 bg-gradient-to-t from-pastel-pink/20 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 scroll-reveal">
            📬 Let's Connect
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 scroll-reveal">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center scroll-reveal">
            <a
              href="mailto:tabinaadeliarafa2004@gmail.com"
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-card hover-float hover-glow transition-all"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-medium">tabinaadeliarafa2004@gmail.com</span>
            </a>
          </div>

          <div className="flex gap-6 justify-center mt-8 scroll-reveal">
            <a
              href="https://github.com/tabinaadeliarafa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-card hover-float hover-glow transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/tabinaadeliarafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-card hover-float hover-glow transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>© 2024 Tabina Adelia Rafa. Built with ❤️ using React & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
