import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { content, loading, error } = usePortfolioContent();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Portfolio</h1>
          <p className="text-muted-foreground">{error || "Failed to load content"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero personal={content.personal} />
      <About personal={content.personal} education={content.education} />
      <Certifications certifications={content.certifications} />
      <Research research={content.research} />
      <Skills skills={content.skills} interests={content.interests} />
      <Contact personal={content.personal} />
      <Footer />
    </div>
  );
};

export default Index;
