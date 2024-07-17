import { download } from "@/src/lib/actions";
import { fetchTableInfoById } from "@/src/lib/data";
import DataTable from "@/src/ui/tables/view/data-table";

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
      <DataTable title={info.title} content={content} />
    </main>
  );

}