'use client'

import { createTable, upload } from "@/src/lib/actions";
import { TableContent } from "@/src/lib/definitions";
import Buttons from "@/src/ui/tables/form/buttons";
import { useState } from "react";
import { useImmer } from "use-immer";
import InputTable from "./input-table";
import InputTitle from "./input-title";

const initialContent: TableContent = {
  cols: [
    { name:"", type:"text" }, 
    { name:"", type:"text" },
    { name:"", type:"text" },
  ],
  rows: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]
};

export default function TableForm(
  { email }: { email: string }
) {
  const [title, setTitle] = useState("");
  const [content, updateContent] = useImmer(initialContent);

  /** テーブル作成 */
  async function post() {
    // テーブルファイル作成
    const url = await upload(content);
    if (!url) {
      return;
    }
    // テーブルデータ作成
    await createTable(email, title, url);
  }

  return (
    <div className="flex flex-col gap-4">
      <InputTitle title={title} setTitle={setTitle} />
      <div>
        <InputTable content={content} updateContent={updateContent} />
      </div>
      <Buttons onPost={post} />
      <div>
        {JSON.stringify(content)}
      </div>
    </div>
  );
};