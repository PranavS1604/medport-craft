import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  personal: {
    name: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
  };
}

export const Hero = ({ personal }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 molecular-bg">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      
      {/* Floating medical icons */}
      <div className="absolute top-20 left-10 text-primary/20 float-animation" style={{ animationDelay: '0s' }}>
        <div className="text-6xl">💊</div>
      </div>
      <div className="absolute top-40 right-20 text-secondary/20 float-animation" style={{ animationDelay: '1s' }}>
        <div className="text-5xl">🧬</div>
      </div>
      <div className="absolute bottom-32 left-20 text-accent/20 pill-bounce" style={{ animationDelay: '0.5s' }}>
        <div className="text-5xl">⚗️</div>
      </div>
      <div className="absolute bottom-20 right-10 text-primary/20 heartbeat">
        <div className="text-6xl">💉</div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-6">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-pulse-medical">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/profile-photo.jpg" 
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
              {personal.name}
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-3 animate-slide-in-left">
              {personal.title}
            </p>
            
            <p className="text-lg md:text-xl text-accent mb-8 animate-slide-in-right">
              {personal.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base animate-fade-in-up">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>{personal.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>{personal.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{personal.location}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-scale-in">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="#research">View Research</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
