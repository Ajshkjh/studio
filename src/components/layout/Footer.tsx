export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} Goal Explorer. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by AI and a passion for a sustainable future.</p>
      </div>
    </footer>
  );
}
