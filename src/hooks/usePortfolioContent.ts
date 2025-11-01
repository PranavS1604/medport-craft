import { useState, useEffect } from 'react';
export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  achievements: string[];
}

export interface PortfolioContent {
  personal: {
    name: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    profilePhoto: string;
  };
  education: Education[];
  certifications: Array<{
    title: string;
    organization: string;
    duration: string;
    hours: string;
    location: string;
    description: string;
    skills: string[];
  }>;
  research: Array<{
    title: string;
    institution: string;
    coAuthors: string[];
    year: string;
    abstract: string;
    highlights: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  interests: string[];
}

export const usePortfolioContent = () => {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/content.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { content, loading, error };
};
