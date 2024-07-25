import Post from "@/database/post.model";
import User from "@/database/user.model";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { body, userId } = await request.json();

    const post = await Post.create({
      body,
      user: userId,
    });

    return NextResponse.json(post);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const posts = await Post.find({})
      .populate({
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      })
      .limit(Number(limit));

    return NextResponse.json(posts);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();

    const { postId } = await request.json();

    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
