import Post from "@/database/post.model";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  route: { params: { postId: string } }
) {
  try {
    connectToDatabase();
    const { postId } = route.params;

    const post = await Post.findById(postId).populate({
      path: "user",
      model: User,
      select: "name email profileImage _id username",
    });

    return NextResponse.json(post);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
