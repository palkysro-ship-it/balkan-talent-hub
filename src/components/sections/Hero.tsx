import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Users, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-surface">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            BalkanX —{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              dom najboljih freelancera
            </span>{" "}
            na Balkanu
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Poveži se s vrhunskim stručnjacima ili pronađi projekte koji te pokreću. 
            <br className="hidden md:block" />
            <span className="text-primary font-medium">Brzo. Sigurno. Transparentno.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-8 py-4 text-lg shadow-glow"
            >
              <Search className="mr-2 h-5 w-5" />
              Objavi projekt
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Istraži freelancere
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/10">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-foreground-secondary">Escrow zaštita</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/10">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-foreground-secondary">Verificirani profili</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/10">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-foreground-secondary">24/7 podrška</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;