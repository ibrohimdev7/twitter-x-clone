import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import { authOptions } from "@/lib/auth-options";
import connectToDatabase from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { body, postId, userId } = await request.json();

    const comment = await Comment.create({
      body,
      user: userId,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    return NextResponse.json(comment);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();

    const { currentUser }: any = await getServerSession(authOptions);

    const { commentId } = await request.json();

    await Comment.findByIdAndUpdate(commentId, {
      $pull: { likes: currentUser?._id },
    });

    return NextResponse.json({
      success: true,
      message: "Comment liked successfully",
    });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();

    const { currentUser }: any = await getServerSession(authOptions);

    const { commentId } = await request.json();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { likes: currentUser?._id },
    });

    return NextResponse.json({
      success: true,
      message: "Comment liked successfully",
    });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
