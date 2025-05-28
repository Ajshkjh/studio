import { Target } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Target className="h-7 w-7" />
          <h1 className="text-xl font-semibold">Goal Explorer</h1>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
