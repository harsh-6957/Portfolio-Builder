import { NextResponse } from "next/server";

// Required for static export
export const dynamic = 'force-static';

// Required for static export
export async function generateStaticParams() {
  return [];
}

export async function POST(request: Request) {
  try {
    const { deploy_id } = await request.json();

    if (!deploy_id) {
      throw new Error("No deployment ID provided");
    }

    // In a real implementation, this would check the actual deployment status
    return NextResponse.json({
      state: "ready",
      deploy_url: `https://portfolio-${deploy_id}.netlify.app`,
      claim_url: `https://app.netlify.com/sites/portfolio-${deploy_id}/deploys`,
      deploy_id
    });
  } catch (error) {
    return NextResponse.json(
      { 
        state: "error",
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}