import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Heart } from "lucide-react";

interface SkillsProps {
  skills: {
    technical: string[];
    soft: string[];
  };
  interests: string[];
}

export const Skills = ({ skills, interests }: SkillsProps) => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Skills & Interests
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-left border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.technical.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm py-2 px-4"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-right border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm py-2 px-4"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
          
          <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-fade-in border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Areas of Interest</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="border-primary text-foreground hover:bg-primary/10 transition-colors text-sm py-2 px-4"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
