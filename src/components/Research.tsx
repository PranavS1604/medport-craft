import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Users, Building2 } from "lucide-react";

interface ResearchItem {
  title: string;
  institution: string;
  coAuthors: string[];
  year: string;
  abstract: string;
  highlights: string[];
  posterImage?: string;
}

interface ResearchProps {
  research: ResearchItem[];
}

export const Research = ({ research }: ResearchProps) => {
  return (
    <section id="research" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Research & Publications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12"></div>
          
          <div className="space-y-8">
            {research.map((item, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-t-secondary animate-fade-in overflow-hidden"
              >
                {item.posterImage && (
                  <div className="mb-6 -mt-4 -mx-4">
                    <img 
                      src={item.posterImage} 
                      alt={`${item.title} research poster`}
                      className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => window.open(item.posterImage, '_blank')}
                    />
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-6">
                  <BookOpen className="w-10 h-10 text-secondary flex-shrink-0 animate-float" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm">{item.institution}</span>
                      </div>
                      <Badge variant="outline" className="border-primary text-primary">
                        {item.year}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        <strong>Authors:</strong> {item.coAuthors.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Abstract</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.abstract}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-3">
                          <span className="text-accent mt-1 font-bold">•</span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
