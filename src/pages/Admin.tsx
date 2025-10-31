import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal, Trash2, PlusCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Define types for your content (optional but highly recommended)
interface Personal {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}
interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  achievements: string[];
}
interface Certification {
  title: string;
  organization: string;
  duration: string;
  hours: string;
  location: string;
  description: string;
  skills: string[];
  certificateImage: string;
}
interface Research {
  title: string;
  institution: string;
  coAuthors: string[];
  year: string;
  abstract: string;
  highlights: string[];
  posterImage: string;
}
interface Skills {
  technical: string[];
  soft: string[];
}
interface PortfolioContent {
  personal: Personal;
  education: Education;
  certifications: Certification[];
  research: Research[];
  skills: Skills;
  interests: string[];
}

const Admin = () => {
  const { data: content, isLoading: isContentLoading } = usePortfolioContent();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This is our new state, holding the editable content object
  const [editableContent, setEditableContent] =
    useState<PortfolioContent | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // When content loads, populate our editable state
  useEffect(() => {
    if (content) {
      setEditableContent(JSON.parse(JSON.stringify(content))); // Deep copy
    }
  }, [content]);

  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Incorrect password.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/update-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password, // Send password for backend verification
          content: editableContent, // Send the whole edited object
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update content");
      }

      setSuccess(
        "Content updated successfully! Your site will redeploy in 1-2 minutes."
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Login Page ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary/20">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-card rounded-lg shadow-xl w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          {error && (
            <p className="text-destructive text-sm mt-4 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    );
  }

  // --- Render Loading or Main Admin Panel ---
  if (isContentLoading || !editableContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <Button onClick={handleSubmit} disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save & Publish
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert
          variant="default"
          className="mb-6 bg-primary/10 border-primary"
        >
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <AdminPersonal
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
        <TabsContent value="education">
          <AdminEducation
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
        <TabsContent value="certifications">
          <AdminCertifications
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
        <TabsContent value="research">
          <AdminResearch
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
        <TabsContent value="skills">
          <AdminSkills
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
        <TabsContent value="interests">
          <AdminInterests
            content={editableContent}
            setContent={setEditableContent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Sub-Component for Personal Info ---
const AdminPersonal = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev: PortfolioContent) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal & Contact Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={content.personal.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={content.personal.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={content.personal.subtitle}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={content.personal.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={content.personal.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={content.personal.location}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio / About Me</Label>
          <Textarea
            id="bio"
            name="bio"
            value={content.personal.bio}
            onChange={handleChange}
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Sub-Component for Education ---
const AdminEducation = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev: PortfolioContent) => ({
      ...prev,
      education: { ...prev.education, [name]: value },
    }));
  };
  
  // Special handler for string arrays like 'achievements'
  const handleArrayChange = (name: string, value: string) => {
    const newArray = value.split('\n'); // Split by new line
    setContent((prev: PortfolioContent) => ({
      ...prev,
      education: { ...prev.education, [name]: newArray },
    }));
  };

  return (
    <Card>
      <CardHeader><CardTitle>Education</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input id="degree" name="degree" value={content.education.degree} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Input id="institution" name="institution" value={content.education.institution} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={content.education.location} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Input id="graduationYear" name="graduationYear" value={content.education.graduationYear} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="achievements">Achievements (one per line)</Label>
          <Textarea
            id="achievements"
            name="achievements"
            value={content.education.achievements.join('\n')}
            onChange={(e) => handleArrayChange('achievements', e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Sub-Component for Certifications (Array) ---
const AdminCertifications = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  
  const handleCertChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newCerts = [...content.certifications];
    newCerts[index] = { ...newCerts[index], [name]: value };
    setContent((prev: PortfolioContent) => ({ ...prev, certifications: newCerts }));
  };
  
  const handleCertSkillsChange = (index: number, value: string) => {
    const newSkills = value.split(',').map(s => s.trim()); // Split by comma
    const newCerts = [...content.certifications];
    newCerts[index] = { ...newCerts[index], skills: newSkills };
    setContent((prev: PortfolioContent) => ({ ...prev, certifications: newCerts }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      title: "New Certification",
      organization: "",
      duration: "",
      hours: "",
      location: "",
      description: "",
      skills: [],
      certificateImage: "/certificates/placeholder.jpg",
    };
    setContent((prev: PortfolioContent) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const removeCertification = (index: number) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      const newCerts = content.certifications.filter((_, i) => i !== index);
      setContent((prev: PortfolioContent) => ({ ...prev, certifications: newCerts }));
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={addCertification} variant="outline" className="gap-2">
        <PlusCircle className="w-4 h-4" /> Add New Certification
      </Button>
      {content.certifications.map((cert, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Certification #{index + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => removeCertification(index)}>
              <Trash2 className="w-5 h-5 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input name="title" value={cert.title} onChange={(e) => handleCertChange(index, e)} />
            </div>
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input name="organization" value={cert.organization} onChange={(e) => handleCertChange(index, e)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" value={cert.description} onChange={(e) => handleCertChange(index, e)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Duration</Label><Input name="duration" value={cert.duration} onChange={(e) => handleCertChange(index, e)} /></div>
              <div className="space-y-2"><Label>Hours</Label><Input name="hours" value={cert.hours} onChange={(e) => handleCertChange(index, e)} /></div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input name="location" value={cert.location} onChange={(e) => handleCertChange(index, e)} />
            </div>
            <div className="space-y-2">
              <Label>Skills (comma-separated)</Label>
              <Input name="skills" value={cert.skills.join(', ')} onChange={(e) => handleCertSkillsChange(index, e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Certificate Image Path</Label>
              <Input name="certificateImage" value={cert.certificateImage} onChange={(e) => handleCertChange(index, e)} />
              <p className="text-xs text-muted-foreground">e.g., /certificates/new-image.jpg</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// --- Sub-Component for Research (Array) ---
const AdminResearch = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newResearch = [...content.research];
    newResearch[index] = { ...newResearch[index], [name]: value };
    setContent((prev: PortfolioContent) => ({ ...prev, research: newResearch }));
  };
  
  const handleArrayChange = (index: number, name: 'coAuthors' | 'highlights', value: string) => {
    const newArray = value.split('\n'); // Split by new line
    const newResearch = [...content.research];
    newResearch[index] = { ...newResearch[index], [name]: newArray };
    setContent((prev: PortfolioContent) => ({ ...prev, research: newResearch }));
  };

  const addResearch = () => {
    const newRes: Research = {
      title: "New Research Project",
      institution: "",
      coAuthors: [],
      year: "",
      abstract: "",
      highlights: [],
      posterImage: "/certificates/placeholder.jpg",
    };
    setContent((prev: PortfolioContent) => ({
      ...prev,
      research: [...prev.research, newRes],
    }));
  };

  const removeResearch = (index: number) => {
    if (confirm("Are you sure you want to delete this research project?")) {
      const newResearch = content.research.filter((_, i) => i !== index);
      setContent((prev: PortfolioContent) => ({ ...prev, research: newResearch }));
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={addResearch} variant="outline" className="gap-2">
        <PlusCircle className="w-4 h-4" /> Add New Research
      </Button>
      {content.research.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Research #{index + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => removeResearch(index)}>
              <Trash2 className="w-5 h-5 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} /></div>
            <div className="space-y-2"><Label>Institution</Label><Input name="institution" value={item.institution} onChange={(e) => handleChange(index, e)} /></div>
            <div className="space-y-2"><Label>Year</Label><Input name="year" value={item.year} onChange={(e) => handleChange(index, e)} /></div>
            <div className="space-y-2"><Label>Abstract</Label><Textarea name="abstract" value={item.abstract} onChange={(e) => handleChange(index, e)} rows={5} /></div>
            <div className="space-y-2"><Label>Co-Authors (one per line)</Label><Textarea name="coAuthors" value={item.coAuthors.join('\n')} onChange={(e) => handleArrayChange(index, 'coAuthors', e.target.value)} rows={3} /></div>
            <div className="space-y-2"><Label>Key Highlights (one per line)</Label><Textarea name="highlights" value={item.highlights.join('\n')} onChange={(e) => handleArrayChange(index, 'highlights', e.target.value)} rows={4} /></div>
            <div className="space-y-2"><Label>Poster Image Path</Label><Input name="posterImage" value={item.posterImage} onChange={(e) => handleChange(index, e)} /><p className="text-xs text-muted-foreground">e.g., /certificates/research-poster.jpg</p></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// --- Sub-Component for Skills & Interests ---
const AdminSkills = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  const handleSkillsChange = (name: 'technical' | 'soft', value: string) => {
    const newSkills = value.split(',').map(s => s.trim());
    setContent((prev: PortfolioContent) => ({
      ...prev,
      skills: { ...prev.skills, [name]: newSkills },
    }));
  };

  return (
    <Card>
      <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Technical Skills (comma-separated)</Label>
          <Textarea
            value={content.skills.technical.join(', ')}
            onChange={(e) => handleSkillsChange('technical', e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label>Soft Skills (comma-separated)</Label>
          <Textarea
            value={content.skills.soft.join(', ')}
            onChange={(e) => handleSkillsChange('soft', e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const AdminInterests = ({
  content,
  setContent,
}: {
  content: PortfolioContent;
  setContent: Function;
}) => {
  const handleInterestsChange = (value: string) => {
    const newInterests = value.split(',').map(s => s.trim());
    setContent((prev: PortfolioContent) => ({
      ...prev,
      interests: newInterests,
    }));
  };

  return (
    <Card>
      <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Interests (comma-separated)</Label>
          <Textarea
            value={content.interests.join(', ')}
            onChange={(e) => handleInterestsChange(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
