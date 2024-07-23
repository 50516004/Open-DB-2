'use client'

import { editTable } from "@/src/lib/actions";
import { TableInfoView } from "@/src/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import InputTitle from "../create/input-title";

export function EditTableInfo(
  { tableInfo }: { tableInfo: TableInfoView }
) {

  const [title, setTitle] = useState(tableInfo.title);

  /** アップロード */
  async function post() {
    // テーブルデータ作成
    await editTable(tableInfo.table_id, title);
  }

  return (
    <div className="flex flex-col gap-4">
      <InputTitle
        title={title}
        setTitle={setTitle}
      />
      <div className="flex gap-4">
        <Link
          href="/tables/home"
          className="btn"
        >キャンセル</Link>
        <button
          onClick={post}
          className="btn bg-blue-400 text-white hover:bg-orange-300"
        >変更</button>
      </div>
    </div>
  );
}