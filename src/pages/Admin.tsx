import { useState } from "react";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal } from "lucide-react";

const Admin = () => {
  const { data: content, isLoading: isContentLoading } = usePortfolioContent();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // This is the password you will set in Vercel Environment Variables
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError(null);
      // Load current content into the editor
      if (content) {
        setJsonContent(JSON.stringify(content, null, 2));
      }
    } else {
      setError("Incorrect password.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Basic JSON validation
    let parsedContent;
    try {
      parsedContent = JSON.parse(jsonContent);
    } catch (err) {
      setError("Invalid JSON format. Please check your content.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/update-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password, // Send password for backend verification
          content: parsedContent,
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

  if (isContentLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <Textarea
          className="w-full h-[600px] font-mono text-sm"
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
        />
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save Changes
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mt-6 bg-primary/10 border-primary">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Admin;
