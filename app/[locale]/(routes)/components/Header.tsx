import FulltextSearch from "./FulltextSearch";
import AvatarDropdown from "./ui/AvatarDropdown";

import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lang: string;
};

const Header = ({ id, name, email, avatar, lang }: Props) => {
  return (
    <>
      <div className="flex h-20 items-center px-5 bg-white/70 dark:bg-slate-900/30 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex justify-center flex-1">
          <FulltextSearch />
        </div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <ThemeToggle />
          <AvatarDropdown
            avatar={avatar}
            userId={id}
            name={name}
            email={email}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
