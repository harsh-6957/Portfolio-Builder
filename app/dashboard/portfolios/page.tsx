"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { mockPortfolios } from "@/lib/mockData";

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState(mockPortfolios);

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Portfolios</h1>
          <p className="text-muted-foreground mt-1">Manage and customize your portfolio websites</p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Portfolio
          </Button>
        </Link>
      </div>
      
      {portfolios.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
          <Card className="flex h-[220px] flex-col items-center justify-center border-dashed bg-muted/50 hover:bg-muted/80 transition-colors">
            <Link href="/dashboard/create" className="flex flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <Button variant="ghost">Create New Portfolio</Button>
            </Link>
          </Card>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <PlusCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-medium">No portfolios yet</h2>
          <p className="text-muted-foreground mt-1">Create your first portfolio to get started.</p>
          <Link href="/dashboard/create" className="mt-4">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Portfolio
            </Button>
          </Link>
        </div>
      )}
    </DashboardShell>
  );
}