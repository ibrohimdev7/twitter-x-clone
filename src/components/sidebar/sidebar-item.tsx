import { LucideIcon } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  item: {
    name: string;
    icon: LucideIcon;
  };
}

const SidebarItem = ({ item: { name, icon: Icon } }: SidebarItemProps) => {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>

      {/* DESKTOP SIDEBAR ITEM */}
      <div className="relative hidden gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center lg:flex">
        <Icon size={24} color="white" />
        <span className="text-xl text-white">{name}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
