import { Card } from "./ui/card";
import { GraduationCap, MapPin } from "lucide-react";

// 1. Define the Education interface (can be imported from hook)
interface Education {
  degree: string;
  institution: string;
  location:string;
  graduationYear: string;
  achievements: string[];
}

interface AboutProps {
  personal: {
    bio: string;
  };
  education: Education[]; // <-- 2. THIS IS THE CHANGE
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
          
          {/* 3. THIS GRID IS NOW 1 COLUMN for bio, 1 COLUMN for education */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-left border-primary/20">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Background</h3>
              <p className="text-muted-foreground leading-relaxed">
                {personal.bio}
              </p>
            </Card>
            
            {/* 4. This column now contains a list of education cards */}
            <div className="space-y-8">
              {education.map((edu, index) => (
                <Card 
                  key={index}
                  className="p-8 hover:shadow-xl transition-shadow duration-300 animate-slide-in-right border-accent/20"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold text-accent">Education</h3>
                      <p className="text-lg font-medium mt-2">{edu.degree}</p>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </div>
                      <p className="text-sm text-primary mt-2">
                        {edu.graduationYear}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <span className="text-accent mt-1">▸</span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
