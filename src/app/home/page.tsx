import { deleteTable, removeTable } from "@/src/lib/actions";
import { fetchTableInfos } from "@/src/lib/data";
import { TableInfoView } from "@/src/lib/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { lusitana } from "@/src/ui/fonts";
import { ArrowTopRightOnSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {

  const tableInfos = await fetchTableInfos();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Tables</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateTable />
      </div>
      <TableList tableInfos={tableInfos} />
    </div>
  );
}

async function TableList(
  { tableInfos }: { tableInfos: TableInfoView[] }
) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creator
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  View
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Open
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tableInfos?.map((table) => (
                <tr
                  key={table.table_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {table.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {table.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(table.updated_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {table.view}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-3">
                      <ViewTable id={table.table_id} />
                      <DeleteTable
                        id={table.table_id}
                        url={table.content_url}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ViewTable({ id }: { id: string }) {
  return (
    <Link
      href={`/home/tables/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ArrowTopRightOnSquareIcon className="w-5" />
    </Link>
  );
}

function DeleteTable(
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

function CreateTable() {
  return (
    <Link
      href="/home/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Table</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}