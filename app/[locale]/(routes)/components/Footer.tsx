import getNextVersion from "@/actions/system/get-next-version";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const nextVersion = await getNextVersion();
  
  return (
    <footer className="flex items-center justify-between h-12 px-5 text-xs text-muted-foreground/60">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
        <span className="text-muted-foreground/40">•</span>
        <span>build: 0.0.3-beta-390</span>
      </div>
      
      <div className="flex items-center gap-3 text-xs">
        <span>NextCRM • 0.0.3-beta-beta</span>
        <span className="text-muted-foreground/40">•</span>
        <span>powered by Next.js {nextVersion?.substring(1, 7) || "15.2.4"}</span>
        <span className="text-muted-foreground/40">•</span>
        <span>shadcnUI</span>
        <span className="text-muted-foreground/40">•</span>
        <span>hosted by: <Link href="https://www.vercel.com" className="hover:text-foreground/80 transition-colors">Vercel</Link></span>
        <span className="text-muted-foreground/40">•</span>
        <span>Supported by: <Link href="https://www.softbase.cz" className="hover:text-foreground/80 transition-colors">SoftBase s.r.o.</Link></span>
      </div>
    </footer>
  );
};

export default Footer;