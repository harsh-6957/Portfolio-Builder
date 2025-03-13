"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { mockPortfolios } from "@/lib/mockData";

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState(mockPortfolios);

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolios and track performance</p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Portfolio
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{portfolios.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {portfolios.filter(p => p.published).length} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">845</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="portfolios" className="mt-8">
        <TabsList>
          <TabsTrigger value="portfolios">My Portfolios</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolios" className="mt-4">
          {portfolios.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
              <Card className="flex h-[220px] flex-col items-center justify-center border-dashed bg-muted/50 hover:bg-muted/80 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <PlusCircle className="h-6 w-6 text-primary" />
                  </div>
                  <Link href="/dashboard/create">
                    <Button variant="ghost">Create New Portfolio</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No portfolios yet</CardTitle>
                <CardDescription>
                  Create your first portfolio to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <Link href="/dashboard/create">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View statistics for your portfolios.
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Detailed analytics are available for premium users. Upgrade to access visitor insights, 
                    traffic sources, and engagement metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}