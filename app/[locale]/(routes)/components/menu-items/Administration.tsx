"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  title: string;
};

const AdministrationMenu = ({ open, title }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes("admin");

  return (
    <Link
      href={"/admin"}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent/50 text-foreground hover:text-foreground"
      }`}
    >
      <Wrench className="w-5 h-5 flex-shrink-0" />
      {open && (
        <span className="text-sm font-medium transition-all duration-200">
          {title}
        </span>
      )}
    </Link>
  );
};

export default AdministrationMenu;