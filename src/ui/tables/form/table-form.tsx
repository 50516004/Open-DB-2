'use client'

import { createTable, upload } from "@/src/lib/actions";
import { TableContent } from "@/src/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import { useImmer } from "use-immer";
import InputTable from "./input-table";
import InputTitle from "./input-title";
import InputCSV from "./upload-csv";

const initialContent: TableContent = {
  cols: [
    { name: "", type: "text" },
    { name: "", type: "text" },
    { name: "", type: "text" },
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
      alert("テーブルの作成に失敗しました。");
      return;
    }
    // テーブルデータ作成
    await createTable(email, title, url);
  }

  return (
    <div className="flex flex-col gap-4">
      <InputCSV
        updateContent={updateContent}
      />
      <InputTitle
        title={title}
        setTitle={setTitle}
      />
      <div>
        <InputTable
          content={content}
          updateContent={updateContent}
        />
      </div>
      <div className="flex gap-4">
        <Link
          href="/tables/home"
          className="btn"
        >Cancel</Link>
        <button
          onClick={post}
          className="btn btn-primary"
        >Create Table</button>
      </div>
    </div>
  );
};