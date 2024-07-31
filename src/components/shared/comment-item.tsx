import React from "react";

import { IPost, IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { sliceText } from "@/lib/utils";
import { FaHeart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CommentItem = ({
  comment,
  user,
  setComments,
}: {
  comment: IPost;
  user: IUser;
  setComments: React.Dispatch<React.SetStateAction<IPost[]>>;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const onLike = async () => {
    try {
      setIsLoading(true);

      if (comment.hasLiked) {
        await axios.delete(`/api/comments`, {
          data: { commentId: comment._id },
        });

        toast({
          title: "Success",
          description: "Your like has been removed successfully.",
        });

        const updatedComment = {
          ...comment,
          hasLiked: false,
          likes: +comment?.likes - 1,
        };

        setComments((prev) =>
          prev.map((c) => (c._id === comment._id ? updatedComment : c))
        );
      } else {
        await axios.put(`/api/comments`, {
          commentId: comment._id,
          userId: user._id,
        });

        toast({
          title: "Success",
          description: "Your like has been added successfully.",
        });

        const updatedComment = {
          ...comment,
          hasLiked: true,
          likes: +comment?.likes + 1,
        };

        setComments((prev) =>
          prev.map((c) => (c._id === comment._id ? updatedComment : c))
        );
      }

      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/comments/${comment?._id}`);

      toast({
        title: "Success",
        description: "Your like has been deleted successfully.",
      });

      setComments((prev) => prev.filter((p) => p._id !== comment._id));

      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

  const goToProfile = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    router.push(`/profile/${user?._id}`);
  };

  return (
    <div
      key={comment._id}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative"
    >
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-sky-600" />
          </div>
        </div>
      )}

      <div className="flex flex-row items-center gap-3">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={comment?.user?.profileImage} />
          <AvatarFallback>{comment?.user?.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div
            className="flex flex-row items-center gap-2"
            onClick={goToProfile}
          >
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {comment?.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden sm:block">
              {comment &&
                sliceText(comment?.user?.username || comment?.user?.email, 20)}
            </span>
            <span className="text-neutral-500 text-sm">
              {comment &&
                comment?.createdAt &&
                formatDistanceToNowStrict(new Date(comment?.createdAt))}{" "}
              ago
            </span>
          </div>

          <div className="text-white mt-1">{comment?.body}</div>

          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <FaHeart
                size={20}
                color={comment.hasLiked ? "red" : ""}
                onClick={onLike}
              />
              <p>{comment.likes || 0}</p>
            </div>
            {comment.user?._id === user?._id && (
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiFillDelete size={20} onClick={onDelete} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
