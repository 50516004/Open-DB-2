import { download } from "@/src/lib/actions";
import { fetchTableInfoById } from "@/src/lib/data";
import DataTable from "@/src/ui/tables/view/reactive-table";

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
      <h1 className="text-xl mb-2">{info.title}</h1>
      <DataTable content={content} />
    </main>
  );

}