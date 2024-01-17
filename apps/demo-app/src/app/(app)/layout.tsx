import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  user: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const Layout = async ({ user, header, sidebar, children }: LayoutProps) => {
  let session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex w-full border-b">
        <div className="flex-none w-72 p-4 border-r">{user}</div>
        <header className="grow p-4">{header}</header>
      </div>

      <div className="flex h-full w-full">
        <aside className="flex-none w-72 p-4 border-r">{sidebar}</aside>
        <div className="grow p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
