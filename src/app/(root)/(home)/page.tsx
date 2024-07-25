"use client";

import React, { useEffect } from "react";
import Header from "@/components/shared/header";
import Form from "@/components/shared/form";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { IPost } from "@/types";
import PostItem from "@/components/shared/post-item";

const Home = () => {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<IPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/posts?limit=10`);
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <Header label="Home" />

      {isLoading || status === "loading" ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 className="animate-spin text-sky-600" />
        </div>
      ) : (
        <>
          <Form
            setPosts={setPosts}
            placeholder="What's on your mind?"
            user={JSON.parse(JSON.stringify(session?.currentUser))}
          />
          {posts.map((post: IPost) => (
            <PostItem
              setPosts={setPosts}
              key={post._id}
              post={post}
              user={JSON.parse(JSON.stringify(session?.currentUser))}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
