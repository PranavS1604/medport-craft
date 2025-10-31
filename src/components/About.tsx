import { Card } from "./ui/card";
import { GraduationCap, MapPin } from "lucide-react";

interface AboutProps {
  personal: {
    bio: string;
  };
  education: {
    degree: string;
    institution: string;
    location: string;
    graduationYear: string;
    achievements: string[];
  };
}

export const About = ({ personal, education }: AboutProps) => {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-left border-primary/20">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Background</h3>
              <p className="text-muted-foreground leading-relaxed">
                {personal.bio}
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-right border-accent/20">
              <div className="flex items-start gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-semibold text-accent">Education</h3>
                  <p className="text-lg font-medium mt-2">{education.degree}</p>
                  <p className="text-muted-foreground">{education.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{education.location}</span>
                  </div>
                  <p className="text-sm text-primary mt-2">
                    {education.graduationYear}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                <ul className="space-y-2">
                  {education.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
