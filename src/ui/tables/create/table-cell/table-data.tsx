import { TableContent } from "@/src/lib/definitions";
import { range } from "@/src/lib/utils";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** レコード入力欄 */
export default function InputRecords(
  {
    rowIdx,
    colIdx,
    content,
    updateContent,
  }: {
    rowIdx: number;
    colIdx: number;
    content: TableContent;
    updateContent: Updater<TableContent>;
  }
) {
  const type = content.cols[colIdx].type;
  const value = content.rows[rowIdx][colIdx];

  /** レコード更新 */
  function changeRecords(text: string) {
    updateContent(draft => {
      draft.rows[rowIdx][colIdx] = text;
    });
  }

  /** 下に行を追加 */
  function addRow() {
    const len = content.cols.length;
    const newRow = range(len).map(() => "");

    updateContent(draft => {
      draft.rows.splice(rowIdx + 1, 0, newRow);
    });
  }

  /** 行を削除 */
  function removeRow() {
    updateContent(draft => {
      draft.rows.splice(rowIdx, 1);
    });
  }

  /** この行を列名に */
  function inputHeader() {
    const rec = content.rows[rowIdx];
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
          onChange={e => changeRecords(e.target.value)}
          placeholder={type}
          className='w-full rounded-md'
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