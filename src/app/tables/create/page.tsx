import { auth } from "@/auth";
import TableForm from "@/src/ui/tables/form/table-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create Table',
};

export default async function Page() {
  const session = await auth();

  const email = session?.user?.email;
  if (!email) {
    redirect("/home");
  }

  return (
    <main>
      <TableForm email={email} />
    </main>
  );

}