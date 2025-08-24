import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Menu, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://anowork.pro/slike/logo.png" 
              alt="BalkanX Logo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-foreground-secondary hover:text-primary transition-colors">
              Početna
            </a>
            <a href="/kategorije" className="text-foreground-secondary hover:text-primary transition-colors">
              Kategorije
            </a>
            <a href="/projekti" className="text-foreground-secondary hover:text-primary transition-colors">
              Projekti
            </a>
            <a href="/freelanceri" className="text-foreground-secondary hover:text-primary transition-colors">
              Freelanceri
            </a>
            <a href="/kako-funkcionira" className="text-foreground-secondary hover:text-primary transition-colors">
              Kako funkcionira
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center bg-surface rounded-lg px-3 py-2 min-w-[300px]">
            <Search className="h-4 w-4 text-foreground-muted mr-2" />
            <input
              type="text"
              placeholder="Traži projekte, freelancere..."
              className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder:text-foreground-muted"
            />
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <AuthModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border/20">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-surface rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-foreground-muted mr-2" />
                <input
                  type="text"
                  placeholder="Traži projekte, freelancere..."
                  className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder:text-foreground-muted"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                <a href="/" className="text-foreground-secondary hover:text-primary transition-colors">
                  Početna
                </a>
                <a href="/kategorije" className="text-foreground-secondary hover:text-primary transition-colors">
                  Kategorije
                </a>
                <a href="/projekti" className="text-foreground-secondary hover:text-primary transition-colors">
                  Projekti
                </a>
                <a href="/freelanceri" className="text-foreground-secondary hover:text-primary transition-colors">
                  Freelanceri
                </a>
                <a href="/kako-funkcionira" className="text-foreground-secondary hover:text-primary transition-colors">
                  Kako funkcionira
                </a>
              </nav>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border/20">
                <AuthModal />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;