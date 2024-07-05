import { download } from "@/src/lib/actions";
import { fetchTableInfoById } from "@/src/lib/data";
import { lusitana } from "@/src/ui/fonts";
import TableView from "@/src/ui/tables/table-view";

type Params = {
  id: string;
};

export default async function Page(
  { params }: { params: Params }
) {

  const id = params.id;

  const [info, content] = await Promise.all([
    fetchTableInfoById(id),
    download(id),
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{info.title}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <TableView content={content} />
      </div>
    </div>
  );

}