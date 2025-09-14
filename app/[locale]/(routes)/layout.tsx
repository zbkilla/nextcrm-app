import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import getAllCommits from "@/actions/github/get-repo-commits";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL! || "http://localhost:3000"
  ),
  title: "",
  description: "",
  openGraph: {
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
};
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  //console.log(session, "session");

  if (!session) {
    return redirect("/sign-in");
  }

  const user = session?.user;

  if (user?.userStatus === "PENDING") {
    return redirect("/pending");
  }

  if (user?.userStatus === "INACTIVE") {
    return redirect("/inactive");
  }

  const build = await getAllCommits();

  //console.log(typeof build, "build");
  return (
    <div className="flex h-screen bg-background">
      <SideBar build={build} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          id={session.user.id as string}
          name={session.user.name as string}
          email={session.user.email as string}
          avatar={session.user.image as string}
          lang={session.user.userLanguage as string}
        />
        <main className="flex-1 overflow-auto bg-background rounded-tl-[2rem]">
          <div className="w-full h-full p-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
