'use client'
import { createTable } from "@/src/lib/actions";
import { TableContent } from "@/src/lib/definitions";
import { Button } from "@/src/ui/button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const initialState: TableContent = {
  headers: ["", ""],
  records: [
    ["", ""],
    ["", ""],
    ["", ""],
  ]
};

export default function TableForm(
  {mail}: {mail: string}
) {
  const [title, setTitle] = useState("");
  const [state, setState] = useState(initialState);
  const { headers, records } = state;

  function handleHeaderChange(
    e: ChangeEvent<HTMLInputElement>, i: number
  ) {
    const newHeaders = [...state.headers];
    newHeaders[i] = e.target.value;

    const newState = { ...state, headers: newHeaders };
    setState(newState);
  }

  function handleCellChange(
    e: ChangeEvent<HTMLInputElement>, i: number, j: number
  ) {
    const newRecords = state.records.map((row) => [...row]);
    newRecords[i][j] = e.target.value;

    const newState = { ...state, records: newRecords };
    setState(newState);
  }

  async function post() {
    try {
      await createTable(mail, title, state);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* タイトル入力欄 */}
      <div>
        <label>
          Title
        </label>
        {" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"タイトル"}
          className=''
        />
      </div>
      {/* テーブル入力欄 */}
      <div>
        <table className='border-collapse border'>
          <thead>
            <tr>
              {
                headers.map((header, i) => (
                  <th key={i}>
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => handleHeaderChange(e, i)}
                      placeholder={"列" + (i + 1)}
                      className='w-full'
                    />
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {records.map((rec, i) => (
              <tr key={i}>
                {
                  rec.map((cel, j) => (
                    <td key={j}>
                      <input
                        type="text"
                        value={cel}
                        onChange={(e) => handleCellChange(e, i, j)}
                        className='w-full'
                      />
                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ボタン */}
      <div className="flex gap-4">
        <Link
          href="/tables"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button onClick={post}>Create Table</Button>
      </div>
    </div>
  );
};