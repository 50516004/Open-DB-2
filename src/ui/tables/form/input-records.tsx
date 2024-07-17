import { TableContent } from "@/src/lib/definitions";
import { range } from "@/src/lib/utils";
import { ChangeEvent } from "react";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** レコード入力欄 */
export default function InputRecords(
  {
    row,
    col,
    content,
    updateContent,
  }: {
    row: number;
    col: number;
    content: TableContent;
    updateContent: Updater<TableContent>;
  }
) {
  const type = content.cols[col].type;
  const value = content.rows[row][col];

  /** レコード更新 */
  function changeRecords(e: ChangeEvent<HTMLInputElement>) {
    updateContent(draft => {
      draft.rows[row][col] = e.target.value;
    });
  }

  /** 下に行を追加 */
  function addRow() {
    const len = content.cols.length;
    const newRow = range(len).map(i => "");

    updateContent(draft => {
      draft.rows.splice(row + 1, 0, newRow);
    });
  }

  /** 行を削除 */
  function removeRow() {
    updateContent(draft => {
      draft.rows.splice(row, 1);
    });
  }

  /** この行を列名に */
  function inputHeader() {
    const rec = content.rows[row];
    updateContent(draft => {
      rec.forEach((cell, i) => {
        draft.cols[i].name = cell;
      });
    });
    removeRow();
  }

  return (
    <DropDownCell
      summary={
        <input
          type={type}
          value={value}
          onChange={changeRecords}
          placeholder={type}
          className='w-full'
        />
      }
      menu={[
        {
          label: "下に行を追加",
          onClick: addRow,
        }, {
          label: "この行を削除",
          onClick: removeRow,
        }, {
          label: "この行を列名にする",
          onClick: inputHeader,
        }
      ]}
    />
  );
};