import { auth } from "@/auth";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { oswald } from "../fonts";
import { CreateTable, Login, Logout } from "./home-buttons";

export default async function TopNav() {
  const session = await auth();
  
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link
          href="/tables/home"
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
      <div className="navbar-end flex gap-2 items-center">
        <CreateTable />
        {session? <Logout /> : <Login />}
      </div>
    </div >
  );
}