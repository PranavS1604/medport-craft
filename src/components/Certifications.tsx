import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Building, Calendar, Clock, MapPin } from "lucide-react";

interface Certification {
  title: string;
  organization: string;
  duration: string;
  hours: string;
  location: string;
  description: string;
  skills: string[];
  certificateImage?: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

export const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Certifications & Training
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {cert.certificateImage && (
                  <div className="mb-6 -mt-4 -mx-4 overflow-hidden rounded-t-lg">
                    <img 
                      src={cert.certificateImage} 
                      alt={`${cert.title} certificate`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => window.open(cert.certificateImage, '_blank')}
                    />
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-4">
                  <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1 group-hover:animate-pulse" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-secondary font-medium mb-3">
                      <Building className="w-4 h-4" />
                      <span>{cert.organization}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{cert.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{cert.hours}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{cert.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
