import React from "react";

import { IUser } from "@/types";
import Button from "../ui/button";

const ProfileBio = ({ user, userId }: { user: IUser; userId: string }) => {
  return (
    <>
      <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
          {userId === user?._id ? (
            <Button label="Edit Profile" secondary />
          ) : (
            <Button label="Follow" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileBio;
