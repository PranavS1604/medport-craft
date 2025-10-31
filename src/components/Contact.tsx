import { Card } from "./ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface ContactProps {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

export const Contact = ({ personal }: ContactProps) => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12"></div>
          
          <Card className="p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300 animate-scale-in">
            <p className="text-center text-lg text-muted-foreground mb-8">
              I'm always open to discussing pharmaceutical research, traditional medicine, or collaboration opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a 
                href={`mailto:${personal.email}`}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <Mail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Email</span>
                <span className="text-xs text-muted-foreground text-center break-all">
                  {personal.email}
                </span>
              </a>
              
              <a 
                href={`tel:${personal.phone}`}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors group"
              >
                <Phone className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Phone</span>
                <span className="text-xs text-muted-foreground text-center">
                  {personal.phone}
                </span>
              </a>
              
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-primary/5">
                <MapPin className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">Location</span>
                <span className="text-xs text-muted-foreground text-center">
                  {personal.location}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={() => window.location.href = `mailto:${personal.email}`}
              >
                Send Email
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
