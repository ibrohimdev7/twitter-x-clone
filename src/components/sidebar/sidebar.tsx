"use client";

import { Bell, Home, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import { IUser } from "@/types";
import { MdOutlineExplore } from "react-icons/md";

const Sidebar = ({ user }: { user: IUser }) => {
  const sidebarItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Notifications",
      href: `/notifications/${user?._id}`,
      icon: Bell,
      hasNewNotification: user?.hasNewNotifications,
    },
    {
      name: "Profile",
      href: `/profile/${user?._id}`,
      icon: User,
    },
    {
      name: "Explore",
      href: `/explore`,
      icon: MdOutlineExplore,
    },
  ];

  return (
    <section className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 pl-2">
      <div className="flex flex-col space-y-2">
        {/* Mobile Sidebar */}
        <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
          <Image
            width={56}
            height={56}
            src={"/images/mobile-logo.svg"}
            alt="10go"
          />
        </div>

        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <SidebarItem {...item} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>

      <SidebarAccount user={user} />
    </section>
  );
};

export default Sidebar;
