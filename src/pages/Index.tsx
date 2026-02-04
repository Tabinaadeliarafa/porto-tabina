import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Eye,
  ExternalLink,
  Code,
  Palette,
  Database,
  BarChart3,
  Figma,
  Globe,
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Navbar } from "@/components/Navbar";

const skills = [
  { name: "Laravel", icon: Code, color: "from-pastel-pink to-pastel-rose" },
  { name: "PostgreSQL", icon: Database, color: "from-pastel-mint to-pastel-cream" },
  { name: "MySQL", icon: Database, color: "from-pastel-rose to-pastel-pink" },
  { name: "JavaScript", icon: Code, color: "from-pastel-cream to-pastel-mint" },
  { name: "Figma", icon: Figma, color: "from-pastel-pink to-pastel-mint" },
  { name: "Python", icon: Code, color: "from-pastel-mint to-pastel-rose" },
  { name: "PHP", icon: Code, color: "from-pastel-mint to-pastel-rose" },
  { name: "Analisis Data", icon: BarChart3, color: "from-pastel-rose to-pastel-cream" },
  { name: "Desain UI/UX", icon: Palette, color: "from-pastel-cream to-pastel-pink" },
  { name: "RESTful API", icon: Globe, color: "from-pastel-mint to-pastel-pink" },
];

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const roles = ["UI/UX Designer", "Backend Developer", "Analis Data"];
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

  // Efek animasi typing
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

  // Scroll reveal + update active section
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
          if (
            id &&
            ["home", "skills", "organizational", "educational", "projects", "contact"].includes(id)
          ) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".scroll-reveal, .scroll-reveal-stagger, .slide-in-left, .slide-in-right, section[id]")
      .forEach((el) => {
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
            <div className="popup-enter mb-12">
              <div className="relative inline-block group">
                {/* Animated rings */}
                <div className="absolute inset-0 w-56 h-56 md:w-72 md:h-72 -m-4 rounded-full border-4 border-dashed border-pastel-pink/40 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 w-60 h-60 md:w-80 md:h-80 -m-6 md:-m-8 rounded-full border-2 border-dotted border-pastel-mint/30 animate-[spin_30s_linear_infinite_reverse]" />

                {/* Floating decorative elements */}
                <div
                  className="absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-br from-pastel-pink to-pastel-rose rounded-full animate-floating shadow-lg"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="absolute -bottom-4 -left-8 w-6 h-6 bg-gradient-to-br from-pastel-mint to-pastel-cream rounded-full animate-floating shadow-lg"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute top-1/2 -right-10 w-4 h-4 bg-gradient-to-br from-pastel-rose to-pastel-pink rounded-full animate-floating shadow-lg"
                  style={{ animationDelay: "2s" }}
                />
                <div
                  className="absolute -top-2 -left-6 w-5 h-5 bg-gradient-to-br from-pastel-cream to-pastel-mint rounded-full animate-floating shadow-lg"
                  style={{ animationDelay: "0.5s" }}
                />

                {/* Glow effect behind photo */}
                <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-pastel-pink/50 via-pastel-mint/30 to-pastel-rose/50 blur-2xl pulse-glow" />

                {/* Main photo container */}
                <div className="relative">
                  <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-pastel-pink via-pastel-mint to-pastel-rose p-1 animate-[spin_8s_linear_infinite]">
                    <div className="w-full h-full rounded-full bg-pastel-cream" />
                  </div>
                  <img
                    src={profilePhoto}
                    alt="Tabina Adelia Rafa"
                    className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-float mx-auto border-4 border-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow"
                  />
                </div>

                {/* Hello badge with bounce */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-card animate-bounce-gentle">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="animate-wave inline-block">👋</span> Halo!
                  </span>
                </div>

                {/* Status indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Tersedia</span>
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

            <div
              className="flex flex-col sm:flex-row gap-5 justify-center items-center popup-enter"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="/CV - Tabina Adelia Rafa .pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-base shadow-soft hover-glow flex items-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Lihat CV
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="rounded-full px-10 py-6 text-base border-2 hover:bg-primary/10"
              >
                <Mail className="w-5 h-5 mr-2" />
                Hubungi Saya
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 bg-gradient-to-b from-transparent via-white/50 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 scroll-reveal">✨ Keahlian Saya</h2>
            <p className="text-center text-muted-foreground mb-12 scroll-reveal">Teknologi & tools yang saya gunakan</p>

            <div className="flex flex-wrap justify-center gap-4 scroll-reveal-stagger">
              {skills.map((skill) => (
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
                { id: "skills", label: "Keahlian", emoji: "✨" },
                { id: "organizational", label: "Organisasi", emoji: "📘" },
                { id: "educational", label: "Pendidikan", emoji: "📗" },
                { id: "projects", label: "Proyek", emoji: "📙" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? "default" : "ghost"}
                  onClick={() => scrollToSection(tab.id)}
                  className={`rounded-full font-medium transition-all duration-300 ${
                    activeSection === tab.id ? "bg-primary text-primary-foreground shadow-soft scale-105" : "hover:bg-primary/20"
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
              Pengalaman Organisasi
            </h2>
            <p className="text-center text-muted-foreground mb-16 scroll-reveal">
              Perjalanan kepemimpinan & kerja tim
            </p>

            <div className="space-y-10">
              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-white border-0 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-pink/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-pink/30 rounded-full text-sm font-medium mb-3">
                        Kepemimpinan
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">Staf Hubungan Eksternal</h3>
                      <p className="text-primary font-medium">Himpunan Mahasiswa Teknik Informatika (HIMATIF)</p>
                      <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                      Feb 2023 – Des 2024
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Mengelola dan memelihara media sosial serta website eksternal HIMATIF
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Menangani komunikasi dan pertanyaan dari pihak eksternal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Membangun dan menjaga kerja sama dengan media serta organisasi eksternal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Memimpin pelaksanaan IFest Unpad untuk meningkatkan visibilitas HIMATIF
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-gradient-to-br from-pastel-mint/10 to-white border-0 relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pastel-mint/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-mint/30 rounded-full text-sm font-medium mb-3">
                        Hubungan Masyarakat
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">Kepala Divisi Hubungan Masyarakat</h3>
                      <p className="text-primary font-medium">Informatics Festival (IFEST)</p>
                      <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                      Jun 2023 - Okt 2023
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Membangun dan menjaga hubungan yang baik dengan pihak eksternal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Mengkoordinasikan kerja sama dengan media dan sponsor untuk kesuksesan acara
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Menyusun strategi komunikasi untuk meningkatkan citra publik
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-gradient-to-br from-pastel-rose/10 to-white border-0 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-rose/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-rose/30 rounded-full text-sm font-medium mb-3">
                        Manajemen Proyek
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">Supervisor Proyek</h3>
                      <p className="text-primary font-medium">Informatics Festival (IFEST) 2024</p>
                      <p className="text-sm text-muted-foreground">Jatinangor, Sumedang</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                      Jun 2024 - Okt 2024
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Memimpin perencanaan dan pelaksanaan acara teknologi dengan 500+ peserta
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Mengamankan kerja sama dengan 20+ perusahaan dan mengoordinasikan 12 pembicara ahli
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Mengawasi strategi media sosial: 685K+ views Instagram Reels, 1.9M+ views TikTok
                    </li>
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
              Pengalaman Pendidikan
            </h2>
            <p className="text-center text-muted-foreground mb-16 scroll-reveal">
              Pembelajaran & pengembangan berkelanjutan
            </p>

            <div className="space-y-10">
              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-white border-0 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-mint/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-mint/30 rounded-full text-sm font-medium mb-3">
                        💻 Magang
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">Backend Developer</h3>
                      <p className="text-primary font-medium">Politeknik STTT Bandung</p>
                      <p className="text-sm text-muted-foreground">Sistem Manajemen Inventaris Laboratorium</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-mint/20 px-4 py-2 rounded-full">
                      Sep - Nov 2025
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Mengembangkan logika backend, desain database, dan RESTful API menggunakan Laravel dan MySQL
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Berkolaborasi dengan tim frontend untuk integrasi API yang lancar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span> Memastikan keamanan sistem serta mengoptimalkan performa
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-left bg-gradient-to-br from-pastel-rose/10 to-white border-0 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pastel-rose/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-rose/30 rounded-full text-sm font-medium mb-3">
                        🎨 Magang
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">UI/UX Designer</h3>
                      <p className="text-primary font-medium">FundEx x Rakamin Academy</p>
                      <p className="text-sm text-muted-foreground">Redesign Landing Page Mobile</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-rose/20 px-4 py-2 rounded-full">
                      Juli 2025
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Mendesain ulang landing page mobile FundEx.id menggunakan framework Design Sprint
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Membuat moodboard, wireframe, mini design system, dan prototype di Figma
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span> Meningkatkan UI/UX dengan memperjelas informasi dan meningkatkan keterbacaan visual
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 md:p-10 rounded-[2rem] shadow-card hover-float slide-in-right bg-gradient-to-br from-pastel-cream/30 to-white border-0 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-pink/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block px-4 py-1 bg-pastel-cream/50 rounded-full text-sm font-medium mb-3">
                        📊 Kursus
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">Analitik Data</h3>
                      <p className="text-primary font-medium">RevoU Mini Course</p>
                      <p className="text-sm text-muted-foreground">Analisis Data & Visualisasi</p>
                    </div>
                    <div className="text-sm md:text-right text-muted-foreground bg-pastel-cream/50 px-4 py-2 rounded-full">
                      Selesai ✓
                    </div>
                  </div>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Mempelajari dasar-dasar analisis data dan teknik visualisasi
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Menerapkan pola pikir analitis pada studi kasus bisnis
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Mengembangkan kemampuan interpretasi data dan penyampaian insight
                    </li>
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
              Proyek Unggulan
            </h2>
            <p className="text-center text-muted-foreground mb-16 scroll-reveal">
              Beberapa hal yang sudah/ sedang saya kerjakan
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8 scroll-reveal-stagger">
              {/* Arzetta Co-Living */}
              <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-pink/10 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-pastel-pink/20 text-pastel-pink px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse" />
                    Pengembangan Backend
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    Arzetta Co-Living
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">Laravel 12 • PostgreSQL • RESTful API</p>

                  <p className="text-foreground/70 mb-6 leading-relaxed line-clamp-4">
                    Membangun RESTful API yang scalable, menyusun komponen MVC yang rapi, dan merancang skema PostgreSQL yang ternormalisasi.
                    Menerapkan autentikasi (JWT/Session), validasi middleware, serta service layer untuk logika bisnis.
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
                    <a href="https://arzetta-coliving.up.railway.app" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="rounded-full border-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              {/* IMDb Film Trends Data Warehouse */}
              <Card className="group p-8 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-white to-pastel-cream/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-pastel-cream/50 text-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                    Data Engineering / Analitik
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    IMDb Film Trends Data Warehouse
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">Top 1000 IMDb • Data Warehouse • OLAP</p>

                  <p className="text-foreground/70 mb-6 leading-relaxed line-clamp-5">
                    Menganalisis data mentah IMDb Top 1000 (rating, genre, sutradara, aktor, dan revenue) serta membangun data warehouse terstruktur
                    menggunakan metodologi Kimball Nine-Step. Data diproses melalui pipeline ETL di SSIS dan dimodelkan dengan star schema untuk mendukung
                    analisis OLAP multidimensi, sehingga dapat mengungkap tren industri dan membantu pengambilan keputusan berbasis data.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Kimball</span>
                    <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">SSIS (ETL)</span>
                    <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">Star Schema</span>
                    <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">OLAP</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* EcoTrack App - Full Width */}
            <Card className="group p-10 rounded-[2rem] shadow-card hover-float scroll-reveal bg-gradient-to-br from-pastel-pink/5 via-white to-pastel-mint/5 border-0 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-pastel-pink/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pastel-mint/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pastel-pink/20 to-pastel-mint/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Pengembangan Aplikasi Mobile
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    EcoTrack Application
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">November 2023 - Januari 2024</p>

                  <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                    Berperan sebagai backend developer yang bertanggung jawab membangun RESTful API 
                    menggunakan Golang untuk fitur seperti verifikasi email, informasi perangkat, 
                    dan pelacakan penggunaan. Merancang skema database, mengimplementasikan 
                    autentikasi pengguna serta manajemen akun, dan mengembangkan fitur manajemen 
                    grup (CRUD, undangan, pengeditan anggota). Berkontribusi pada analitik AI serta 
                    integrasi DeepSeek AI untuk menghasilkan insight penggunaan data, dengan seluruh 
                    fitur berhasil diuji dan dideploy.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">Backend</span>
                    <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">REST API</span>
                    <span className="px-4 py-2 bg-background/70 rounded-full text-sm font-medium">AI Integration</span>
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
              Mari Terhubung
            </h2>

            <p className="text-lg text-muted-foreground mb-12 scroll-reveal max-w-xl mx-auto">
              Saya selalu terbuka untuk berdiskusi tentang proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda ✨
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
                  <span className="text-xs text-muted-foreground block">Email saya di</span>
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
              <p>© Tabina Adelia Rafa • Teknik Informatika, Universitas Padjadjaran</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
