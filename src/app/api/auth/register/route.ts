import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "../../../../../database/user.model";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const step = searchParams.get("step");

    if (step === "1") {
      const { email } = await req.json();
      const isExistUser = await User.findOne({ email });

      if (isExistUser) {
        return NextResponse.json(
          { error: "Email already exist" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
