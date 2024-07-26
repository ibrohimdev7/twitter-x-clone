import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import connectToDatabase from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  route: { params: { postId: string } }
) {
  try {
    connectToDatabase();
    const { postId } = route.params;

    const { currentUser }: any = await getServerSession(authOptions);

    const post = await Post.findById(postId).populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      },
      options: { sort: { likes: -1 } },
    });

    const filteredComments = post?.comments?.map((comment: any) => ({
      body: comment?.body,
      createdAt: comment?.createdAt,
      user: {
        _id: comment?.user?._id,
        name: comment?.user?.name,
        email: comment?.user?.email,
        profileImage: comment?.user?.profileImage,
        username: comment?.user?.username,
      },
      likes: comment?.likes?.length,
      hasLiked: comment?.likes?.includes(currentUser?._id),
      _id: comment?._id,
    }));

    return NextResponse.json(filteredComments);
  } catch (error) {
    const res = error as Error;

    return NextResponse.json({ error: res.message }, { status: 400 });
  }
}
