"use client";

import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Briefcase, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-md">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">PortfolioBuilder</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden">
                <div className="py-4">
                  <DashboardNav />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_1fr] md:gap-8 lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-8">
          {children}
        </main>
      </div>
    </div>
  );
}