"use server";

import User from "@/database/user.model";
import connectToDatabase from "../mongoose";
import { authOptions } from "../auth-options";
import { getServerSession } from "next-auth";

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const { currentUser }: any = await getServerSession(authOptions);

    const user = await User.findById(userId);

    const filterUser = {
      _id: user?.id,
      name: user?.name,
      email: user?.email,
      coverImage: user?.coverImage,
      profileImage: user?.profileImage,
      username: user?.username,
      bio: user?.bio,
      location: user?.location,
      createdAt: user?.createdAt,
      followers: user?.followers?.length || 0,
      following: user?.following?.length || 0,
      isFollowing: user?.followers?.includes(currentUser?._id) || false,
    };

    return filterUser;
  } catch (error) {
    throw error;
  }
}
