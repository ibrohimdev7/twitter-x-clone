"use client";

import React from "react";

import Header from "@/components/shared/header";
import Button from "@/components/ui/button";
import useNotifications from "@/hooks/use-notifications";
import { IPost } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

const Page = ({ params }: { params: { userId: string } }) => {
  const [isClearing, setIsClearing] = React.useState(false);

  const { data, isLoading, mutate } = useNotifications(params.userId);

  const onDelete = async () => {
    try {
      setIsClearing(true);
      await fetch(`/api/notifications/${params.userId}`, {
        method: "DELETE",
      });
      mutate();

      toast({
        title: "Notifications cleared",
        description: "All notifications have been cleared",
      });

      setIsClearing(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header label="Notifications" isBack />

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <div className="flex flex-col">
          {data?.length > 0 ? (
            data?.map((notification: IPost) => (
              <div
                key={notification?._id}
                className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
              >
                <Image
                  alt="logo"
                  src={"/images/logo.svg"}
                  width={32}
                  height={32}
                />
                <p className="text-white">{notification?.body}</p>
              </div>
            ))
          ) : (
            <div className="text-neutral-600 text-center p-6 text-xl">
              No notifications
            </div>
          )}

          {data?.length > 0 && (
            <div className="flex justify-center items-center h-24">
              <Button
                outline
                label="Clear all"
                onClick={onDelete}
                disabled={isClearing}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
