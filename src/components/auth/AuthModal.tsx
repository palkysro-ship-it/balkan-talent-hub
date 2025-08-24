import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    city: "",
    acceptTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast({
          title: "Greška pri prijavi",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Uspješno ste se prijavili!",
          description: "Dobro došli na BalkanX.",
        });
        setIsOpen(false);
        setLoginData({ email: "", password: "", rememberMe: false });
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nešto je pošlo po zlu. Pokušajte ponovno.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Greška",
        description: "Lozinke se ne podudaraju.",
        variant: "destructive",
      });
      return;
    }

    if (!registerData.acceptTerms) {
      toast({
        title: "Greška",
        description: "Morate prihvatiti uvjete korištenja.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: registerData.firstName,
            last_name: registerData.lastName,
            company_name: registerData.companyName,
            location: registerData.location,
            role: isFreelancer ? 'freelancer' : 'client',
          },
        },
      });

      if (error) {
        toast({
          title: "Greška pri registraciji",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registracija uspješna!",
          description: "Provjerite email za potvrdu računa.",
        });
        setIsOpen(false);
        setRegisterData({
          firstName: "",
          lastName: "",
          companyName: "",
          email: "",
          password: "",
          confirmPassword: "",
          location: "",
          city: "",
          acceptTerms: false,
        });
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nešto je pošlo po zlu. Pokušajte ponovno.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center space-x-3">
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-foreground-secondary hover:text-primary">
            <LogIn className="h-4 w-4 mr-2" />
            Prijavi se
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <UserPlus className="h-4 w-4 mr-2" />
            Registriraj se
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md bg-card border-border/20">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            Dobro došli na BalkanX
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-surface">
            <TabsTrigger value="login" className="text-foreground-secondary data-[state=active]:text-foreground">
              Prijava
            </TabsTrigger>
            <TabsTrigger value="register" className="text-foreground-secondary data-[state=active]:text-foreground">
              Registracija
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="bg-surface border-border/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Lozinka</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-surface border-border/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 h-5 w-5 text-foreground-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="remember-me"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: checked })}
                  />
                  <Label htmlFor="remember-me" className="text-sm text-foreground-secondary">
                    Zapamti me
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Zaboravljena lozinka?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Prijavljivanje..." : "Prijavi se"}
              </Button>
            </form>

            <p className="text-center text-sm text-foreground-secondary">
              Nemaš račun?{" "}
              <button
                onClick={() => {
                  const registerTab = document.querySelector('[data-value="register"]') as HTMLElement;
                  registerTab?.click();
                }}
                className="text-primary hover:underline font-medium"
              >
                Registriraj se
              </button>
            </p>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="role-switch"
                  checked={isFreelancer}
                  onCheckedChange={setIsFreelancer}
                />
                <Label htmlFor="role-switch" className="text-sm">
                  {isFreelancer ? "Registriraj se kao Freelancer" : "Registriraj se kao Klijent"}
                </Label>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {isFreelancer ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Ime</Label>
                    <Input
                      id="first-name"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="bg-surface border-border/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Prezime</Label>
                    <Input
                      id="last-name"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className="bg-surface border-border/20"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="company-name">Naziv tvrtke</Label>
                  <Input
                    id="company-name"
                    value={registerData.companyName}
                    onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                    className="bg-surface border-border/20"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="bg-surface border-border/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Država</Label>
                  <Input
                    id="location"
                    value={registerData.location}
                    onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                    className="bg-surface border-border/20"
                    placeholder="Hrvatska"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Grad</Label>
                  <Input
                    id="city"
                    value={registerData.city}
                    onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                    className="bg-surface border-border/20"
                    placeholder="Zagreb"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Lozinka</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="bg-surface border-border/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 h-5 w-5 text-foreground-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Potvrda lozinke</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="bg-surface border-border/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 h-5 w-5 text-foreground-muted hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="accept-terms"
                  checked={registerData.acceptTerms}
                  onCheckedChange={(checked) => setRegisterData({ ...registerData, acceptTerms: checked })}
                />
                <Label htmlFor="accept-terms" className="text-sm text-foreground-secondary">
                  Prihvaćam{" "}
                  <a href="#" className="text-primary hover:underline">
                    Uvjete korištenja
                  </a>{" "}
                  i{" "}
                  <a href="#" className="text-primary hover:underline">
                    Pravila privatnosti
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Registracija..." : "Registriraj se"}
              </Button>
            </form>

            <p className="text-center text-sm text-foreground-secondary">
              Već imaš račun?{" "}
              <button
                onClick={() => {
                  const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
                  loginTab?.click();
                }}
                className="text-primary hover:underline font-medium"
              >
                Prijavi se
              </button>
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};