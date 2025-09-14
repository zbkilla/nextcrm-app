"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  title: string;
};

const EmailsModuleMenu = ({ open, title }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes("emails");

  return (
    <Link
      href={"/emails"}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent/50 text-foreground hover:text-foreground"
      }`}
    >
      <Mail className="w-5 h-5 flex-shrink-0" />
      <span className={`text-sm font-medium transition-all duration-200 ${
        !open ? "w-0 overflow-hidden" : ""
      }`}>
        {title}
      </span>
    </Link>
  );
};

export default EmailsModuleMenu;