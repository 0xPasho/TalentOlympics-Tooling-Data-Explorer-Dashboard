import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const data = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      return {
        date: date.toISOString().split("T")[0],
        desktop: Math.floor(Math.random() * 500),
        mobile: Math.floor(Math.random() * 500),
      };
    }).reverse();

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
