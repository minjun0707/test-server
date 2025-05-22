import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from './theme-provider';
import { ThemeToggle } from './theme-toggle';
import { Toaster } from './ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xl font-bold">테스트 서버</Link>
              <nav className="flex items-center gap-4">
                <Link to="/guestbook" className="text-sm font-medium hover:underline">
                  방명록
                </Link>
                <Link to="/slack" className="text-sm font-medium hover:underline">
                  슬랙 전광판
                </Link>
              </nav>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 container py-6">
          {children}
        </main>
        <footer className="border-t py-4">
          <div className="container text-center text-sm text-muted-foreground">
            © 2025 테스트 서버. All rights reserved.
          </div>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
} 