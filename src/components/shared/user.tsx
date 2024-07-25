import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";

const User = ({ user }: { user: IUser }) => {
  return (
    <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white line-clamp-1">
            {user.name}
          </p>
          <p className="text-neutral-400 text-sm line-clamp-1">
            {sliceText(user.username || user.email, 16)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
