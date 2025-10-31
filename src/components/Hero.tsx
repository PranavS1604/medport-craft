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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-primary/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary">
                    {personal.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
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
