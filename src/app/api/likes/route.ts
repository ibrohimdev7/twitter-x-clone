import Post from "@/database/post.model";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connectToDatabase();

    const { postId, userId } = await request.json();

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: userId },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();

    const { postId, userId } = await request.json();

    await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
