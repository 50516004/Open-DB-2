import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log(session?.user);

  return (
    <p>Home Page</p>
  );
}