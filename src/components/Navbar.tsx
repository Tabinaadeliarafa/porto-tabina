import { Home, Briefcase, GraduationCap, FolderOpen, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Navbar = ({ onNavigate, activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "skills", icon: Sparkles, label: "Skills" },
    { id: "organizational", icon: Briefcase, label: "Organization" },
    { id: "educational", icon: GraduationCap, label: "Education" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-pastel-pink text-white p-3 rounded-2xl shadow-soft hover:shadow-float transition-all duration-300 hover-float"
      >
        <div className="w-5 h-5 flex flex-col justify-center gap-1">
          <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-24 bg-pastel-pink flex-col items-center py-12 gap-8 shadow-card z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-pastel-pink shadow-float scale-110' 
                  : 'bg-white/20 text-white hover:bg-white/40 hover:scale-105'
              }`}
            >
              <Icon className="w-6 h-6" />
              
              {/* Tooltip */}
              <span className="absolute left-20 bg-white text-pastel-pink px-4 py-2 rounded-xl shadow-soft text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Sidebar */}
      <nav
        className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-pastel-pink flex-col items-center py-24 gap-6 shadow-card z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`flex items-center gap-4 w-56 px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-pastel-pink shadow-float' 
                  : 'bg-white/20 text-white hover:bg-white/40'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
        />
      )}
    </>
  );
};
