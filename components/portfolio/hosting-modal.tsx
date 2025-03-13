"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Lock, Loader2, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getDeploymentStatus, initializeDeployment } from "@/lib/deploy";

interface HostingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HostingModal({ open, onOpenChange }: HostingModalProps) {
  const [hostingType, setHostingType] = useState<string>("netlify");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<any>(null);
  const [githubRepo, setGithubRepo] = useState("");
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [deployId, setDeployId] = useState<string | null>(null);

  // Poll deployment status
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isDeploying && deployId) {
      interval = setInterval(async () => {
        try {
          const status = await getDeploymentStatus({ deploy_id: deployId });
          setDeployStatus(status);

          // If deployment is complete, stop polling
          if (status.state === "ready" || status.state === "error") {
            setIsDeploying(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error checking deployment status:", error);
          setIsDeploying(false);
          clearInterval(interval);
        }
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDeploying, deployId]);

  const handleDeploy = async () => {
    if (!githubRepo && hostingType === "netlify") {
      return;
    }

    setIsDeploying(true);
    setDeployStatus(null);
    
    try {
      const response = await initializeDeployment({
        provider: "netlify",
        githubRepo,
        autoDeploy
      });

      if (response.deploy_id) {
        setDeployId(response.deploy_id);
      }
    } catch (error) {
      console.error("Deployment error:", error);
      setIsDeploying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Hosting Option</DialogTitle>
          <DialogDescription>
            Select how you want to host your portfolio website
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          {deployStatus?.state === "ready" ? (
            <div className="text-center space-y-4">
              <div className="text-green-500 font-medium">
                Deployment successful! 🎉
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your portfolio is now live at:
                </p>
                <a 
                  href={deployStatus.deploy_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline break-all"
                >
                  {deployStatus.deploy_url}
                </a>
              </div>
              {deployStatus.claim_url && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    To manage your site on Netlify:
                  </p>
                  <a 
                    href={deployStatus.claim_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline break-all"
                  >
                    Click here to claim your site
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              <RadioGroup
                defaultValue="netlify"
                value={hostingType}
                onValueChange={setHostingType}
                className="grid gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="netlify"
                    id="netlify"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="netlify"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="relative w-24 h-8 mb-3">
                      <Image
                        src="https://www.netlify.com/v3/img/components/full-logo-dark.png"
                        alt="Netlify"
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="font-medium leading-none">Deploy to Netlify</p>
                      <p className="text-sm text-muted-foreground">
                        Fast and secure hosting with continuous deployment
                      </p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="custom"
                    id="custom"
                    className="peer sr-only"
                    disabled
                  />
                  <Label
                    htmlFor="custom"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-muted/50 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-not-allowed"
                  >
                    <div className="relative">
                      <Globe className="mb-3 h-6 w-6 opacity-50" />
                      <Lock className="absolute -right-2 -top-2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="font-medium leading-none">Custom Domain</p>
                      <p className="text-sm text-muted-foreground">
                        Coming soon - Host with your own domain
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {hostingType === "netlify" && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github-repo">GitHub Repository</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="github-repo"
                          placeholder="username/repository"
                          value={githubRepo}
                          onChange={(e) => setGithubRepo(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter your GitHub repository URL or path
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-deploy"
                      checked={autoDeploy}
                      onCheckedChange={(checked) => setAutoDeploy(checked as boolean)}
                    />
                    <Label htmlFor="auto-deploy">
                      Enable auto-deploy on GitHub push
                    </Label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {deployStatus?.state === "ready" ? "Close" : "Cancel"}
          </Button>
          {!deployStatus?.state && (
            <Button 
              onClick={handleDeploy} 
              disabled={isDeploying || hostingType === "custom" || !githubRepo}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy to Netlify"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}