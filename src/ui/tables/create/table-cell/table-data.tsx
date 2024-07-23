import { ColType, TableContent } from "@/src/lib/definitions";
import { range } from "@/src/lib/utils";
import { Updater } from "use-immer";
import DropDownCell from "./drop-down-cell";

/** レコード入力欄 */
export default function InputData(
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
  function changeData(text: string) {
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
  function toColName() {
    const rec = content.rows[rowIdx];
    updateContent(draft => {
      rec.forEach((cell, i) => {
        draft.cols[i].name = cell;
      });
    });
    removeRow();
  }

  /** この行を列名に */
  function toColType() {
    const rec = content.rows[rowIdx];
    updateContent(draft => {
      rec.forEach((cell, i) => {
        draft.cols[i].type = getType(cell);
      });
    });
  }

  return (
    <DropDownCell
      summary={
        <input
          type={type}
          value={value}
          onChange={e => changeData(e.target.value)}
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
          onClick: toColName,
        }, {
          label: "この行で列の型を指定",
          onClick: toColType,
        }
      ]}
    />
  );
};

function getType(value: string): ColType {
  // 数値を判定する正規表現
  const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

  // 日付を判定する正規表現 (YYYY-MM-DD形式)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // 時間を判定する正規表現 (HH:MM形式、24時間表記)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (numberRegex.test(value)) {
      return 'number';
  }
  if (dateRegex.test(value)) {
      // 日付フォーマットかつ、有効な日付かを追加でチェック
      const date = new Date(value);
      if (date instanceof Date && !isNaN(date.getTime())) {
          return 'date';
      }
  }
  if (timeRegex.test(value)) {
      return 'time';
  }

  // どの条件にも当てはまらない場合はtext
  return 'text';
}
