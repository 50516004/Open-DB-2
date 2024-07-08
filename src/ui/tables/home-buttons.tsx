import { deleteTable, removeTable } from "@/src/lib/actions";
import { ArrowTopRightOnSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function ViewTable({ id }: { id: string }) {
  return (
    <Link
      href={`/home/tables/${id}/view`}
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
      href="/home/create"
      className="btn btn-primary"
    >
      <span className="hidden md:block">Create Table</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}