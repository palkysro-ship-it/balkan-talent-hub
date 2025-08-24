import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="https://anowork.pro/slike/logo.png" 
              alt="BalkanX Logo" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-foreground-secondary text-sm">
              Dom najboljih freelancera na Balkanu. Povezujemo talente s projektima.
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Platforma</h3>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li><a href="/kategorije" className="hover:text-primary transition-colors">Kategorije</a></li>
              <li><a href="/projekti" className="hover:text-primary transition-colors">Projekti</a></li>
              <li><a href="/freelanceri" className="hover:text-primary transition-colors">Freelanceri</a></li>
              <li><a href="/kako-funkcionira" className="hover:text-primary transition-colors">Kako funkcionira</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Podrška</h3>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li><a href="/pomoc" className="hover:text-primary transition-colors">Pomoć</a></li>
              <li><a href="/kontakt" className="hover:text-primary transition-colors">Kontakt</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/cijene" className="hover:text-primary transition-colors">Cijene</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Pravno</h3>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li><a href="/uvjeti" className="hover:text-primary transition-colors">Uvjeti korištenja</a></li>
              <li><a href="/privatnost" className="hover:text-primary transition-colors">Privatnost</a></li>
              <li><a href="/kolacici" className="hover:text-primary transition-colors">Kolačići</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground-secondary">
            © 2024 BalkanX. Sva prava pridržana.
          </p>
          <p className="text-sm text-foreground-secondary flex items-center">
            Napravljeno s <Heart className="h-4 w-4 text-red-500 mx-1" /> za Balkan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;