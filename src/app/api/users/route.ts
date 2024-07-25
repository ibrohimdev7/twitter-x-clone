import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/database/user.model";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const users = await User.find({})
      .select("name username _id profileImage email")
      .limit(Number(limit));

    return NextResponse.json(users);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
