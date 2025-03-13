import { NextResponse } from "next/server";

// Required for static export
export const dynamic = 'force-static';

// Required for static export
export async function generateStaticParams() {
  return [];
}

export async function POST(request: Request) {
  try {
    const { provider, githubRepo, autoDeploy, build } = await request.json();
    
    if (provider !== "netlify") {
      return NextResponse.json(
        { error: "Unsupported deployment provider" },
        { status: 400 }
      );
    }

    // Create a deploy action
    const deployAction = {
      type: "deploy",
      provider: "netlify",
      build: {
        command: build.command,
        output: build.output
      }
    };

    return NextResponse.json({
      state: "pending",
      message: "Deployment initiated",
      provider: "netlify",
      github_url: githubRepo,
      autoDeploy: autoDeploy,
      deploy_id: Date.now().toString() // This will be used to track the deployment
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Deployment failed" },
      { status: 500 }
    );
  }
}