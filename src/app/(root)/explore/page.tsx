"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

import Header from "@/components/shared/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types";
import { Loader2, Search } from "lucide-react";
import { sliceText } from "@/lib/utils";
import { removeSpaces } from "@/lib/remove-spaces";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [allUsers, setAllUsers] = React.useState<IUser[]>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/users?limit=20");
      setAllUsers(data);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    if (text && text?.length > 2) {
      setIsLoading(true);

      const { data } = await axios.get(`/api/users/search/${text}`);
      setUsers(data);
      setIsLoading(false);
    } else {
      setUsers(allUsers);
      setIsLoading(false);
    }
  };

  const debounceSearch = debounce(handleSearch, 800);

  return (
    <>
      <Header label="Explore" />

      <div className="relative">
        <Input
          placeholder="Search for users"
          className="mt-2 w-[98%] mx-auto border-none bg-neutral-800 text-white block"
          onChange={debounceSearch}
        />

        <div className="absolute rounded-md h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
          <Search className="text-white" size={28} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          {!users?.length ? (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No users found
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-6">
              {users?.map((user) => (
                <Link key={user?._id} href={`/profile/${user?._id}`}>
                  <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative mr-4">
                    <div className="flex flex-row gap-4">
                      <Avatar>
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-white line-clamp-1">
                          {user.name}
                        </p>
                        <p className="text-neutral-500 text-sm line-clamp-1">
                          {sliceText(
                            user?.username
                              ? `@${removeSpaces(user?.username)}`
                              : user.email,
                            16
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Page;
