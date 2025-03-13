// Types for deployment status
export interface DeploymentStatus {
  state: "pending" | "ready" | "error";
  deploy_url?: string;
  claim_url?: string;
  error?: string;
  github_url?: string;
  deploy_id?: string;
}

export interface DeployConfig {
  provider: string;
  githubRepo?: string;
  autoDeploy?: boolean;
}

/**
 * Get the current deployment status
 * This function is used to check the status of an ongoing deployment
 */
export async function getDeploymentStatus(options: Record<string, any>): Promise<DeploymentStatus> {
  try {
    const response = await fetch("/api/deploy/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options)
    });

    if (!response.ok) {
      throw new Error("Failed to get deployment status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting deployment status:", error);
    return {
      state: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

/**
 * Initialize deployment with GitHub repository
 */
export async function initializeDeployment(config: DeployConfig): Promise<DeploymentStatus> {
  try {
    const response = await fetch("/api/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...config,
        build: {
          command: "npm run build",
          output: "out"
        }
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to initialize deployment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error initializing deployment:", error);
    throw error;
  }
}