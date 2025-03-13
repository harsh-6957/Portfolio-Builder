"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, ExternalLink, MoreHorizontal, Trash2, BarChart3, Copy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Portfolio } from "@/lib/mockData";

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-3 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40"></div>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">
            {portfolio.name}
          </CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {portfolio.template.charAt(0).toUpperCase() + portfolio.template.slice(1)} template
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/edit/${portfolio.id}`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/analytics/${portfolio.id}`} className="cursor-pointer">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${portfolio.slug}`} className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Badge variant={portfolio.published ? "default" : "secondary"}>
              {portfolio.published ? "Published" : "Draft"}
            </Badge>
            <span className="text-muted-foreground">
              Updated {formatDistanceToNow(new Date(portfolio.lastUpdated), { addSuffix: true })}
            </span>
          </div>
          <div className="text-muted-foreground">
            {portfolio.views} views
          </div>
        </div>
      </CardContent>
    </Card>
  );
}