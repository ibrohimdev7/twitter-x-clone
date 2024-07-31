import React from "react";

import { BsDot } from "react-icons/bs";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  name: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  hasNewNotification?: boolean; 
}

const SidebarItem = ({ name, icon: Icon, hasNewNotification }: SidebarItemProps) => {
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
        {hasNewNotification && (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        )}
      </div>
    </div>
  );
};

export default SidebarItem;
