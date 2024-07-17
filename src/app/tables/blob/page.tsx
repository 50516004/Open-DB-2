import { BlobList } from "@/src/ui/blob/blob-list";
import { Form } from "@/src/ui/blob/text-form";

export default async function Page() {

  return (
    <div className="w-full">
      <Form/>
      <BlobList />
    </div>
  );
}