import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

type Props = {
  open: boolean;
  title: string;
};

const DashboardMenu = ({ open, title }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === "/" || pathname === "/dashboard";
  return (
    <Link
      href={"/"}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent/50 text-foreground hover:text-foreground"
      }`}
    >
      <Home className="w-5 h-5 flex-shrink-0" />
      {open && (
        <span className="text-sm font-medium transition-all duration-200">
          {title}
        </span>
      )}
    </Link>
  );
};

export default DashboardMenu;
