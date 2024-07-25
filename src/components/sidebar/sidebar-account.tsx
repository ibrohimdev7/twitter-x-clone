import React from "react";
import { signOut } from "next-auth/react";

import { RiLogoutCircleLine } from "react-icons/ri";
import { IUser } from "@/types";
import { Popover, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";

interface SidebarAccountProps {
  user: IUser;
}

const SidebarAccount = ({ user }: SidebarAccountProps) => {
  return (
    <div>
      {/* MOBIlE SIDEBAR ACCOUNT */}
      <div className="lg:hidden block">
        <div
          className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
          onClick={() => signOut()}
        >
          <RiLogoutCircleLine size={24} color="white" />
        </div>
      </div>

      {/* DESKTOP SIDEBAR ACCOUNT */}
      <Popover>
        <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user?.profileImage} alt={user?.username} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p title={user?.name} className="text-start">
                  {sliceText(user?.name, 15)}
                </p>
                {user?.username ? (
                  <p className="opacity-40"> {user?.username} </p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};

export default SidebarAccount;
