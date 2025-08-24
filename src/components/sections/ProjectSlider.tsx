import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, DollarSign, MapPin, Eye, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  budget_type: 'fixed' | 'hourly';
  fixed_amount?: number;
  hourly_min?: number;
  hourly_max?: number;
  estimated_hours?: number;
  deadline?: string;
  skills_required: string[];
  created_at: string;
  profiles: {
    first_name?: string;
    last_name?: string;
    company_name?: string;
    location?: string;
  };
}

const ProjectSlider = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select(`
            *,
            profiles!projects_client_id_fkey (
              first_name,
              last_name,
              company_name,
              location
            )
          `)
          .eq("status", "open")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching projects:", error);
        } else {
          setProjects(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const formatBudget = (project: Project) => {
    if (project.budget_type === 'fixed' && project.fixed_amount) {
      return `${(project.fixed_amount / 100).toLocaleString()} €`;
    } else if (project.budget_type === 'hourly' && project.hourly_min && project.hourly_max) {
      return `${(project.hourly_min / 100)} - ${(project.hourly_max / 100)} €/h`;
    }
    return "Dogovorivo";
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return "Fleksibilno";
    const date = new Date(deadline);
    return date.toLocaleDateString("hr-HR");
  };

  const getClientName = (profile: any) => {
    if (profile.company_name) return profile.company_name;
    if (profile.first_name && profile.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return "Anonimni klijent";
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Najnoviji projekti
            </h2>
            <p className="text-xl text-foreground-secondary">
              Zadnjih 5 objavljenih projekata
            </p>
          </div>
          <div className="relative">
            <Card className="bg-surface border-border/20 animate-pulse">
              <CardHeader>
                <div className="h-8 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Najnoviji projekti
            </h2>
            <p className="text-xl text-foreground-secondary">
              Trenutno nema objavljenih projekata. Budi prvi!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Najnoviji projekti
          </h2>
          <p className="text-xl text-foreground-secondary">
            Zadnjih 5 objavljenih projekata
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-surface border border-border/20 hover:bg-surface-elevated hover:border-primary/30 transition-all duration-200"
            disabled={projects.length <= 1}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-surface border border-border/20 hover:bg-surface-elevated hover:border-primary/30 transition-all duration-200"
            disabled={projects.length <= 1}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Project Card */}
          <Card className="bg-surface border-border/20 hover:border-primary/30 transition-all duration-300 shadow-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl text-foreground mb-2 line-clamp-2">
                    {currentProject.title}
                  </CardTitle>
                  <p className="text-foreground-secondary line-clamp-3 mb-4">
                    {currentProject.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProject.skills_required.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                    {currentProject.skills_required.length > 4 && (
                      <Badge variant="secondary" className="bg-muted/50 text-foreground-muted">
                        +{currentProject.skills_required.length - 4} više
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatBudget(currentProject)}
                  </div>
                  <div className="text-sm text-foreground-secondary capitalize">
                    {currentProject.budget_type === 'fixed' ? 'Fiksno' : 'Satnica'}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-foreground-secondary">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Rok: {formatDeadline(currentProject.deadline)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-foreground-secondary">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {currentProject.profiles.location || "Remote"}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-foreground-secondary">
                  <span className="text-sm">
                    Klijent: {getClientName(currentProject.profiles)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  Pošalji ponudu
                </Button>
                <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  <Eye className="mr-2 h-4 w-4" />
                  Pogledaj projekt
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-foreground-muted hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;