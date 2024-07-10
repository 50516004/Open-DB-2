import DropDownDetails from "@/src/ui/sandbox/drop-down-details";
import DropDownFocus from "@/src/ui/sandbox/drop-down-focus";
import DropDownState from "@/src/ui/sandbox/drop-down-state";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'UI Test',
};

export default function Page() {

  return (
    <main>
      <DropDownFocus />
      <DropDownDetails/>
      <DropDownState />
    </main>
  );
}
