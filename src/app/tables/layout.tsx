import SideNav from "@/src/ui/dashboard/sidenav";
import { oswald } from '@/src/ui/fonts';
import { CreateTable, Logout } from "@/src/ui/tables/home-buttons";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Layout(
  { children }: { children: React.ReactNode }
) {

  return (
    <div className="h-screen flex flex-col">
      <TopMenu />
      <div className="flex flex-row" style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="min-w-52 shadow-md">
          <SideNav />
        </div>
        <div className="grow overflow-y-scroll p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

function TopMenu() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link
          href="/home"
          className="btn btn-ghost"
        >
          <CircleStackIcon className="w-7 text-blue-400" />
          <span className={`${oswald.className} antialiased text-2xl`}>OpenDB</span>
        </Link>
      </div>
      <div className="navbar-center">
        <input type="text"
          placeholder="検索"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="navbar-end flex gap-4 items-center">
        <CreateTable />
        <Logout />
      </div>
    </div >
  );
}