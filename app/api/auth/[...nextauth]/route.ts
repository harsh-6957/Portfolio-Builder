import { NextResponse } from "next/server";
import { mockAuth } from "@/lib/mockData";

// Required for static export
export const dynamic = 'force-static';

// Required for static export
export async function generateStaticParams() {
  return [
    { nextauth: ["signin"] },
    { nextauth: ["signout"] },
    { nextauth: ["session"] },
    { nextauth: ["providers"] },
    { nextauth: ["csrf"] }
  ];
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await mockAuth.login(email, password);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Authentication endpoint" },
    { status: 200 }
  );
}