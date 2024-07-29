"use client";

import { IPost, IUser } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import PostItem from "../shared/post-item";

interface Props {
  userId: string;
  user: IUser;
}

const PostFeed = ({ userId, user }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<IPost[]>([]);

  const getPosts = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`/api/users/posts/${userId}`);

      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return isLoading ? (
    <div className="flex justify-center items-center h-24">
      <Loader2 className="animate-spin text-sky-500" />
    </div>
  ) : (
    posts.map((post: IPost) => (
      <PostItem setPosts={setPosts} key={post._id} post={post} user={user} />
    ))
  );
};

export default PostFeed;
