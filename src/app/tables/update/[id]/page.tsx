import { auth, getUser } from "@/auth";
import { fetchTableInfoById } from "@/src/lib/data";
import { EditTableInfo } from "@/src/ui/tables/edit/edit-table-info";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'テーブル情報編集',
};

type Params = {
  id: string;
};

export default async function Page(
  { params }: { params: Params }
) {
  // セッション情報からメールアドレスを取得
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("tables/home");
  }

  // メールアドレスからユーザ情報を取得
  const user = await getUser(email);
  if (!user) {
    redirect("tables/home");
  }

  // テーブル情報の取得
  const table_id = params.id;
  const tableInfo = await fetchTableInfoById(table_id);
  if (tableInfo.creator_id != user.id) {
    redirect("tables/home");
  }

  return (
    <main>
      <EditTableInfo tableInfo={tableInfo} />
    </main>
  );

}