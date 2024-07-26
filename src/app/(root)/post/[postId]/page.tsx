"use client";

import React, { useEffect } from "react";

import Header from "@/components/shared/header";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { IPost } from "@/types";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Form from "@/components/shared/form";
import CommentItem from "@/components/shared/comment-item";

const Page = ({ params }: { params: { postId: string } }) => {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingComment, setIsFetchingComment] = React.useState(false);
  const [post, setPost] = React.useState<IPost | null>(null);
  const [comments, setComments] = React.useState<IPost[]>([]);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/posts/${params?.postId}`);
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    try {
      setIsFetchingComment(true);
      const { data } = await axios.get(`/api/posts/${params?.postId}/comments`);
      setComments(data);
      setIsFetchingComment(false);
    } catch (error) {
      console.log(error);
      setIsFetchingComment(false);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header label="Posts" isBack />

      {isLoading || status === "loading" ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 className="animate-spin text-sky-600" />
        </div>
      ) : (
        <>
          <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={post?.user?.profileImage} />
                <AvatarFallback>{post?.user?.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-white font-semibold cursor-pointer hover:underline">
                    {post?.user?.name}
                  </p>
                  <span className="text-neutral-500 cursor-pointer hover:underline hidden sm:block">
                    {post && post?.user?.username
                      ? `@${sliceText(
                          post?.user?.username || post?.user?.email,
                          20
                        )}`
                      : post &&
                        sliceText(
                          post?.user?.username || post?.user?.email,
                          20
                        )}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    {post &&
                      post?.createdAt &&
                      formatDistanceToNowStrict(new Date(post?.createdAt))}{" "}
                    ago
                  </span>
                </div>

                <div className="text-white mt-1">{post?.body}</div>
              </div>
            </div>
          </div>

          <Form
            setPosts={setComments}
            placeholder="Post your reply?"
            user={JSON.parse(JSON.stringify(session?.currentUser))}
            postId={params?.postId}
            isComment
          />

          {isFetchingComment ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="animate-spin text-sky-600" />
            </div>
          ) : (
            comments.map((comment: IPost) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                user={JSON.parse(JSON.stringify(session?.currentUser))}
                setComments={setComments}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Page;
