import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, CreditCard, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Objavi",
      description: "Objavi svoj projekt s detaljnim opisom, budžetom i rokovima. Besplatno i jednostavno.",
      forRole: "client"
    },
    {
      icon: Users,
      title: "Izaberi",
      description: "Pregledaj ponude kvalificiranih freelancera i izaberi najbolju za svoj projekt.",
      forRole: "client"
    },
    {
      icon: CreditCard,
      title: "Radi i naplati",
      description: "Sigurna escrow zaštita garantira plaćanje tek nakon uspješno završenog posla.",
      forRole: "client"
    }
  ];

  const freelancerSteps = [
    {
      icon: Users,
      title: "Pronađi",
      description: "Pronađi projekte koji odgovaraju tvojim vještinama i interesima.",
      forRole: "freelancer"
    },
    {
      icon: FileText,
      title: "Pošalji ponudu",
      description: "Napiši personaliziranu ponudu s planom rada i cjenom za projekt.",
      forRole: "freelancer"
    },
    {
      icon: CreditCard,
      title: "Radi i naplati",
      description: "Radi na projektu i primi plaćanje sigurno preko escrow sustava.",
      forRole: "freelancer"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kako funkcionira
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Jednostavan proces u tri koraka za klijente i freelancere
          </p>
        </div>

        {/* For Clients */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Za klijente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-surface border-border/20 hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl text-foreground mb-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-foreground-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* For Freelancers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Za freelancere
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {freelancerSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-surface border-border/20 hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl text-foreground mb-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-foreground-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow between steps */}
                {index < freelancerSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-surface to-surface-elevated rounded-2xl p-8 border border-border/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Spreman za početak?
          </h3>
          <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
            Pridruži se tisućama zadovoljnih korisnika na BalkanX platformi i ostvari svoje ciljeve već danas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-8">
              Registriraj se kao Freelancer
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 px-8">
              Registriraj se kao Klijent
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;