import { signOut } from "@/auth";
import { deleteTable, removeTable } from "@/src/lib/actions";
import { TableInfoView } from "@/src/lib/definitions";
import { ArrowRightStartOnRectangleIcon, ArrowTopRightOnSquareIcon, PencilIcon, PlusIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
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

export function UpdateTable({ id }: { id: string }) {
  return (
    <Link
      href={`/tables/update/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTable(
  { tableInfo }: { tableInfo: TableInfoView }
) {

  async function action() {
    'use server'
    await deleteTable(tableInfo.content_url);
    await removeTable(tableInfo.table_id);
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

export function Login() {
  return (
    <Link
      href="/login"
      className="btn bg-blue-400 text-white hover:bg-orange-300"
    >
      <UserCircleIcon className="h-6" />
      <span className="hidden md:block">
        ログイン
      </span>
    </Link>
  );
}

export function Logout() {

  const action = async () => {
    'use server';
    await signOut();
  }
  
  return (
    <form
      action={action}>
      <button className="btn btn-outline">
        <ArrowRightStartOnRectangleIcon className="w-5" />
        <span className="hidden md:block">
          ログアウト
        </span>
      </button>
    </form>
  );
}