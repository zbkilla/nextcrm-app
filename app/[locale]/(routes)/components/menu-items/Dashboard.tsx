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
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group border ${
        isActive
          ? "bg-gray-900 dark:bg-white/10 text-white border-gray-200/20 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent"
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
