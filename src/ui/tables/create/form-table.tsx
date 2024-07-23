'use client'

import { createTable, upload } from "@/src/lib/actions";
import { TableContent } from "@/src/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import { useImmer } from "use-immer";
import InputCSV from "./input-csv";
import InputTable from "./input-table";
import InputTitle from "./input-title";

/** テーブル初期値 */
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

/**
 * テーブル作成フォーム
 * @param param0 
 * @returns 
 */
export default function TableForm(
  { email }: { email: string }
) {
  const [title, setTitle] = useState("");
  const [content, updateContent] = useImmer(initialContent);

  /** アップロード */
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
        >キャンセル</Link>
        <button
          onClick={post}
          className="btn bg-blue-400 text-white hover:bg-orange-300"
        >アップロード</button>
      </div>
    </div>
  );
};