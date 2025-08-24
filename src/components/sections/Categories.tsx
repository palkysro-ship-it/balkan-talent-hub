import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, PenTool, TrendingUp, Video, Settings, BarChart, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Code,
  Palette,
  PenTool,
  TrendingUp,
  Video,
  Settings,
  BarChart,
  Shield,
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  active_projects_count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching categories:", error);
        } else {
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Kategorije usluga
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Pronađi stručnjake u svim područjima poslovanja
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-surface border-border/20 animate-pulse">
                <CardHeader>
                  <div className="h-12 w-12 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kategorije usluga
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Pronađi stručnjake u svim područjima poslovanja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;
            return (
              <Card 
                key={category.id} 
                className="bg-surface border-border/20 hover:border-primary/30 hover:shadow-elegant transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-foreground-secondary">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">
                      {category.active_projects_count} aktivnih projekata
                    </span>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;