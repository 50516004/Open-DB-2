'use client'

import { Col, TableContent } from "@/src/lib/definitions";
import { Updater } from "use-immer";

export default function InputCSV(
  {
    updateContent,
  }: {
    updateContent: Updater<TableContent>
  }
) {

  /** CSVアップロード */
  function readFile(fileList: FileList | null) {
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
    <div>
      <label className="label-text">
        CSVインポート:
      </label>
      {" "}
      <input
        type="file"
        accept=".csv"
        onChange={e => readFile(e.target.files)}
        className="file-input file-input-bordered file-input-accent file-input-sm max-w-xs focus:outline-offset-0"
      />
    </div>
  );
};

/**
 * CSVテキストをパースする
 * @param text 
 * @returns 
 */
function parseCSV(csvText: string): string[][] {
  const regex = /(?:"([^"]*(?:""[^"]*)*)"|([^",\r\n]*))(,|\r?\n|$)/g;

  const records: string[][] = [];
  let record: string[] = [];

  for (const match of csvText.matchAll(regex)) {
    const [, quotedField, unquotedField, delimiter] = match;
    const value = (quotedField !== undefined)
      ? quotedField.replace(/""/g, '"')
      : unquotedField;

    record.push(value);

    if (delimiter === ',' || delimiter === '') {
      continue;
    }

    records.push(record);
    record = [];
  }

  return records;
}


/**
 * 二次元配列がテーブルとして利用可能か判定する
 * @param array 
 * @returns 
 */
function canUse(array: string[][]) {
  if (!array || array.length == 0) {
    return false;
  }
  const n = array[0].length;
  return array.every(item => item.length == n);
}

/**
 * 指定された数の列オブジェクトを作成する
 * @param n 
 * @returns 
 */
function makeCols(n: number) {
  const cols: Col[] = [];
  for (let index = 0; index < n; index++) {
    cols.push({ name: "", type: "text" });
  }
  return cols;
}