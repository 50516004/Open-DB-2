import { download } from "@/src/lib/actions";
import { fetchTableInfoById, validate } from "@/src/lib/data";
import { DeleteTable, UpdateTable } from "@/src/ui/tables/home-buttons";
import DataTable from "@/src/ui/tables/view/table";

type Params = {
  id: string;
};

export default async function Page(
  { params }: { params: Params }
) {

  const id = params.id;
  const info = await fetchTableInfoById(id);
  const content = await download(info.content_url);

  const isMine = await validate(info);

  return (
    <main className="flex flex-col gap-1">
      <div className="flex gap-3 items-center">
        <h1 className="text-xl">{info.title}</h1>
        {isMine && <UpdateTable id={id}/>}
        {isMine && <DeleteTable tableInfo={info}/>}
      </div>
      <DataTable content={content} />
    </main>
  );

}