import { auth } from "@/auth";
import TableForm from "@/src/ui/tables/form/form-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'テーブル作成',
};

export default async function Page() {
  const session = await auth();

  const email = session?.user?.email ?? "user@nextmail.com";

  return (
    <main>
      <TableForm email={email} />
    </main>
  );

}