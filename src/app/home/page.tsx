import { fetchTableInfos } from "@/src/lib/data";
import { TableInfoView } from "@/src/lib/definitions";
import { formatDateToLocal } from "@/src/lib/utils";
import { lusitana } from "@/src/ui/fonts";
import { CreateTable, DeleteTable, ViewTable } from "@/src/ui/tables/home-buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {

  const tableInfos = await fetchTableInfos();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>ルートテーブル</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateTable />
      </div>
      <TableList tableInfos={tableInfos} />
    </div>
  );
}

function TableList(
  { tableInfos }: { tableInfos: TableInfoView[] }
) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 pt-0">
          <table className="min-w-full text-gray-900 md:table">
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
