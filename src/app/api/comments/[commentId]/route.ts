import Comment from "@/database/comment.model";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  route: { params: { commentId: string } }
) {
  try {
    await connectToDatabase();

    const { commentId } = route.params;

    await Comment.findByIdAndDelete(commentId);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
