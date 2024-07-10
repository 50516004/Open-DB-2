import { ColType, TableContent } from "@/src/lib/definitions";
import { range } from "@/src/lib/utils";
import { ChangeEvent } from "react";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** レコード入力欄 */
export default function InputRecords(
  {
    row,
    col,
    value,
    type,
    updateContent,
  }: {
    row: number;
    col: number;
    value: string;
    type: ColType;
    updateContent: Updater<TableContent>;
  }
) {

  /** レコード更新 */
  function changeRecords(e: ChangeEvent<HTMLInputElement>) {
    updateContent(draft => {
      draft.rows[row][col] = e.target.value;
    });
  }

  /** 下に行を追加 */
  function addRow() {
    updateContent(draft => {
      const len = draft.cols.length;
      const newRow = range(len).map(i => "");
      console.log(row + 1);
      draft.rows.splice(row + 1, 0, newRow);
    });
  }

  /** 行を削除 */
  function removeRow() {
    updateContent(draft => {
      draft.rows.splice(row, 1);
    });
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
        }
      ]}
    />
  );
};