'use client'

import { createTable, upload } from "@/src/lib/actions";
import { TableContent } from "@/src/lib/definitions";
import Buttons from "@/src/ui/tables/form/buttons";
import Table from "@/src/ui/tables/form/table-editor";
import TitleEditor from "@/src/ui/tables/form/title-editor";
import { useState } from "react";

const initialState: TableContent = {
  headers: ["", ""],
  records: [
    ["", ""],
    ["", ""],
    ["", ""],
  ]
};

export default function TableForm(
  { mail }: { mail: string }
) {
  const [title, setTitle] = useState("");
  const [state, setState] = useState(initialState);

  async function post() {
    const url = await upload(state);
    if (!url) {
      return;
    }
    await createTable(mail, title, url);
  }

  return (
    <div className="flex flex-col gap-4">
      <TitleEditor title={title} setTitle={setTitle} />
      <div>
        <Table state={state} setState={setState} />
      </div>
      <Buttons onClick={post} />
    </div>
  );
};