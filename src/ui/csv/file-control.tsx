'use client'

import { ChangeEvent, useState } from "react";

export default function FileControl() {

  const [values, setValues] = useState([[""]]);

  /** CSVダウンロード */
  function download() {
    // CSV文字列に変換
    const csvContent = values.map(row => row.join(',')).join('\n');

    // Blobを使ってCSVファイルを作成
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // ダウンロードリンクを作成し、プログラムでクリックイベントを発火
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    document.body.appendChild(link); // FirefoxではリンクをDOMに追加する必要がある
    link.click();
    document.body.removeChild(link);
  }

  /** CSVアップロード */
  function upload(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result != "string") {
        return;
      }
      const array = result.split(/\r\n|\r|\n/)
        .filter(line => line.length > 0)
        .map(line => line.split(','));

      setValues(array);
    }

    reader.readAsText(file);

  }

  return (
    <>
      <div>{values}</div>
      <div className="flex gap-5">
        <input
          type="file"
          onChange={upload}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
        <button
          onClick={download}
          className="btn btn-primary"
        >
          ダウンロード
        </button>
      </div>
    </>
  );

}