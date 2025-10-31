export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Portfolio. Built with care for healthcare professionals.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Traditional Medicine • Modern Healthcare • Research Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};
