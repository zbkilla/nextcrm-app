"use client";

import { Coins } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  localizations: any;
};

const CrmModuleMenu = ({ open, localizations }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes("crm");

  return (
    <Link
      href={"/crm"}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent/50 text-foreground hover:text-foreground"
      }`}
    >
      <Coins className="w-5 h-5 flex-shrink-0" />
      {open && (
        <span className="text-sm font-medium transition-all duration-200">
          Sales
        </span>
      )}
    </Link>
  );
};

export default CrmModuleMenu;