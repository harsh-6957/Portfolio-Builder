import { NextResponse } from "next/server";

// Required for static export
export const dynamic = 'force-static';

// Required for static export
export async function generateStaticParams() {
  return [];
}

export function GET() {
  return NextResponse.json(
    { message: "Auth error endpoint" },
    { status: 200 }
  );
}