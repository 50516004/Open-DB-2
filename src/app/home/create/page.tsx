import { auth } from "@/auth";
import Breadcrumbs from "@/src/ui/invoices/breadcrumbs";
import TableForm from "@/src/ui/tables/table-form";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'tables',
            href: '/tables'
          }, {
            label: 'create',
            href: '/tables/create',
            active: true,
          },
        ]}
      />
      <TableForm mail={session?.user?.email ?? ""} />
    </main>
  );

}