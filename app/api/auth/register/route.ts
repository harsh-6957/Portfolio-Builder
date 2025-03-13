import { NextResponse } from "next/server";
import { mockAuth } from "@/lib/mockData";

// Required for static export
export const dynamic = 'force-static';

// Required for static export
export async function generateStaticParams() {
  return [];
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const user = await mockAuth.register(name, email, password);
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Registration endpoint" },
    { status: 200 }
  );
}