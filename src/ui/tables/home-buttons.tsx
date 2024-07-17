import { signOut } from "@/auth";
import { deleteTable, removeTable } from "@/src/lib/actions";
import { ArrowRightStartOnRectangleIcon, ArrowTopRightOnSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function ViewTable({ id }: { id: string }) {
  return (
    <Link
      href={`/tables/view/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ArrowTopRightOnSquareIcon className="w-5" />
    </Link>
  );
}

export function DeleteTable(
  { id, url }: { id: string, url: string }
) {

  async function action() {
    'use server'
    await deleteTable(url);
    await removeTable(id);
  }

  return (
    <form action={action}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateTable() {
  return (
    <Link
      href="/tables/create"
      className="btn bg-blue-400 text-white hover:bg-orange-300"
    >
      <PlusIcon className="h-5" />
      <span className="hidden md:block">
        テーブル作成
      </span>
    </Link>
  );
}

export function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}>
      <button className="btn btn-outline">
        <ArrowRightStartOnRectangleIcon className="w-5" />
        <span>ログアウト</span>
      </button>
    </form>
  );
}