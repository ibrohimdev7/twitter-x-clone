import React from "react";

import Auth from "@/components/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/sidebar";
import FollowBar from "@/components/shared/follow-bar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl">
      <div className="flex">
        <Sidebar user={JSON.parse(JSON.stringify(session?.user))} />
        <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl
            showSpinner
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299dd, 0 0 5px #2299dd"
          />
          <div className="w-full">{children}</div>
          <Toaster />
        </div>
        <FollowBar />
      </div>
    </div>
  );
};

export default Layout;
