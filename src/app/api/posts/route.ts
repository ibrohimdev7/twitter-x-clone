import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import connectToDatabase from "@/lib/mongoose";
import { getServerSession } from "next-auth";
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

    const { currentUser }: any = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const posts = await Post.find({})
      .populate({
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      })
      .limit(Number(limit));

    const filteredPosts = posts.map((post) => ({
     body: post?.body,
     createdAt: post?.createdAt,
     comments: post?.comments?.length,
     user: {
      _id: post?.user?._id,
      name: post?.user?.name,
      email: post?.user?.email,
      profileImage: post?.user?.profileImage,
      username: post?.user?.username,
     },
     likes: post?.likes?.length,
     hasLiked: post?.likes?.includes(currentUser?._id),
     _id: post?._id,
    }));

    return NextResponse.json(filteredPosts);
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
