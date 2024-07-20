import React from "react";

import Auth from "@/components/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Layout;
