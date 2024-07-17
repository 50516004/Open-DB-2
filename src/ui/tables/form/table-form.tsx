'use client'

import { createTable, upload } from "@/src/lib/actions";
import { Col, TableContent } from "@/src/lib/definitions";
import Buttons from "@/src/ui/tables/form/buttons";
import { ChangeEvent, useState } from "react";
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
      return;
    }
    // テーブルデータ作成
    await createTable(email, title, url);
  }

  /** CSVアップロード */
  function readFile(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {

        const rows = parseCSV(result);
        if (canUse(rows)) {
          const len = rows[0].length;
          updateContent(draft => {
            draft.cols = makeCols(len);
            draft.rows = rows;
          });
        }
      }
    }

    reader.readAsText(file);

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
      <Buttons onPost={post} />
    </div>
  );
};

function parseCSV(text: string) {
  return text.split("\n")
    .filter(line => line.length > 0)
    .map(line => line.split(','));
}

function canUse(array: string[][]) {
  if (!array || array.length == 0) {
    return false;
  }
  const n = array[0].length;
  return array.every(item => item.length == n);
}

function makeCols(n: number) {
  const cols: Col[] = [];
  for (let index = 0; index < n; index++) {
    cols.push({ name: "", type: "text" });
  }
  return cols;
}