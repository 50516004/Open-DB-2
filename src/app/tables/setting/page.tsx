import { auth } from "@/auth";
import SettingForm from "@/src/ui/tables/setting/setting-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: '設定',
};

export default async function Page() {
  const session = await auth();

  const name = session?.user?.name;
  const email = session?.user?.email;
  if(!name || !email) {
    redirect("/tables/home");
  }

  return (
    <main>
      <SettingForm userName={name} userMail={email} />
    </main>
  );

}