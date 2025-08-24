import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Crown, Trophy, Award, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Freelancer {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  hourly_rate?: number;
  rating: number;
  reviews_count: number;
  projects_completed: number;
  total_earned: number;
  skills: string[];
  availability_status: string;
}

const Leaderboard = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("month");

  useEffect(() => {
    const fetchTopFreelancers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "freelancer")
          .gt("projects_completed", 0)
          .order("rating", { ascending: false })
          .order("projects_completed", { ascending: false })
          .limit(8);

        if (error) {
          console.error("Error fetching freelancers:", error);
        } else {
          setFreelancers(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFreelancers();
  }, []);

  const getFreelancerName = (freelancer: Freelancer) => {
    if (freelancer.first_name && freelancer.last_name) {
      return `${freelancer.first_name} ${freelancer.last_name}`;
    }
    return "Anonimni freelancer";
  };

  const getInitials = (freelancer: Freelancer) => {
    const name = getFreelancerName(freelancer);
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const formatEarnings = (amount: number) => {
    return `${(amount / 100).toLocaleString()} €`;
  };

  const formatHourlyRate = (rate?: number) => {
    if (!rate) return "Dogovorivo";
    return `${(rate / 100)} €/h`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="font-bold text-foreground-secondary">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Top Rated</Badge>;
      case 1:
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white">Pro</Badge>;
      case 2:
        return <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">Expert</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ljestvica najboljih
            </h2>
            <p className="text-xl text-foreground-secondary">
              Najbolji freelanceri na BalkanX platformi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-surface border-border/20 animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-muted rounded"></div>
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
            Ljestvica najboljih
          </h2>
          <p className="text-xl text-foreground-secondary mb-8">
            Najbolji freelanceri na BalkanX platformi
          </p>

          {/* Tabs for time periods */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-surface">
              <TabsTrigger value="week" className="text-foreground-secondary data-[state=active]:text-foreground">
                Tjedno
              </TabsTrigger>
              <TabsTrigger value="month" className="text-foreground-secondary data-[state=active]:text-foreground">
                Mjesečno
              </TabsTrigger>
              <TabsTrigger value="all" className="text-foreground-secondary data-[state=active]:text-foreground">
                Sveukupno
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelancers.map((freelancer, index) => (
              <Card 
                key={freelancer.id} 
                className={`bg-surface border-border/20 hover:border-primary/30 hover:shadow-elegant transition-all duration-300 cursor-pointer group ${
                  index < 3 ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={freelancer.avatar_url} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {getInitials(freelancer)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 bg-surface rounded-full p-1">
                          {getRankIcon(index)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {getFreelancerName(freelancer)}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-foreground-secondary">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{freelancer.location || "Remote"}</span>
                        </div>
                      </div>
                    </div>
                    {getRankBadge(index)}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{freelancer.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-foreground-secondary">
                      ({freelancer.reviews_count} recenzija)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {freelancer.skills.slice(0, 3).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-muted/50 text-foreground-muted">
                        +{freelancer.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-foreground-secondary">Projekti</div>
                      <div className="font-semibold text-foreground">{freelancer.projects_completed}</div>
                    </div>
                    <div>
                      <div className="text-foreground-secondary">Satnica</div>
                      <div className="font-semibold text-foreground">{formatHourlyRate(freelancer.hourly_rate)}</div>
                    </div>
                  </div>

                  {/* Total earned */}
                  <div className="text-center p-3 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <div className="text-sm text-foreground-secondary mb-1">Ukupni prihod</div>
                    <div className="text-lg font-bold text-primary">
                      {formatEarnings(freelancer.total_earned)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
                      Angažiraj
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      freelancer.availability_status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-xs text-foreground-secondary capitalize">
                      {freelancer.availability_status === 'available' ? 'Dostupan' : 'Zauzet'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </div>
    </section>
  );
};

export default Leaderboard;