"use client";

import React from "react";
import { IPost, IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";
import axios from "axios";

interface Props {
  placeholder: string;
  user: IUser;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const Form = ({ placeholder, user, setPosts }: Props) => {
  const [body, setBody] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/posts", {
        body,
        userId: user._id,
      });

      const newPosts = {...data, user};
      setPosts((prev) => [newPosts, ...prev]);

      toast({
        title: "Success",
        description: "Your post has been posted successfully.",
      });

      setBody("");
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

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <textarea
            placeholder={placeholder}
            disabled={isLoading}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 w-full h-[1px] border-neutral-800 transition" />

          <div className="flex mt-4 flex-row justify-end">
            <Button
              label="Post"
              disabled={isLoading || !body}
              onClick={onSubmit}
              className="px-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
