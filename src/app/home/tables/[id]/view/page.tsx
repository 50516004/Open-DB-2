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
  const info = await fetchTableInfoById(id);
  const content = await download(info.content_url);

  return (
    <main>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{info.title}</h1>
      </div>
      <TableView content={content} />
    </main>
  );

}